from django.shortcuts import redirect, HttpResponse, get_object_or_404
from django.http import JsonResponse
from django.views.generic.base import View
from django.contrib.auth import login
from applications.user.models import CustomUser
from applications.main.models import EducationMaterial, MaterialMark
from applications.main.smtp import SMTPServer
from applications.main.forms import CreateMaterialForm, MaterialMarkForm
from django.core.serializers import serialize
from rest_framework.views import APIView
import random
import json

class RegisterUser(View):
    def post(self, request):
        data = request.POST

        if (CustomUser.objects.filter(email = data.get("email"))):
            return HttpResponse('Not')
        
        if (CustomUser.objects.filter(username = data.get("email"))):
            return HttpResponse('Not')
        
        if (CustomUser.objects.filter(name = data.get("name"))):
            return HttpResponse('Not')
        
        user = CustomUser(username = data.get('email'), email = data.get('email'), userPlaceOfStudy = data.get('userPlaceOfStudy'), name = data.get('name'), password = data.get('password'),
                        type_user = data.get('type_user'), fullName= data.get('fullName'))
        user.set_password(data.get('password'))
        user.save()

        login(self.request, user)
        return HttpResponse('Ok')
    

class SendResetPassword(View):
    def post(self, request):
        if request.method == 'POST':
            email = request.POST.get('email')
            try:
                user = CustomUser.objects.get(email=email)
            except CustomUser.DoesNotExist:
                return JsonResponse({'status': 'error'})
            
            reset_code = str(random.randint(100000, 999999))
            user.reset_code = reset_code
            user.verify_code = False
            user.save()

            smtp_server = SMTPServer()
            smtp_server.send_message(f'Ваша учетная запись - {user.username}. АКТИВАЦИЯ АККАУНТА', GenerateMail(reset_code), user.email, html_content = None)

            return JsonResponse({'status': 'success'})
        
class VerifyCode(View):
    def post(self, request):
        if request.method == 'POST':
            email = request.POST.get('email')
            reset_code = request.POST.get('reset_code')
            try:
                user = CustomUser.objects.get(email=email)
            except CustomUser.DoesNotExist:
                return JsonResponse({'status': 'error'})
            
            
            if (user.reset_code != reset_code):
                user.verify_code = False
                user.save()
                return JsonResponse({'status': 'not_verify'})
            else:
                user.verify_code = True
                user.save()
                return JsonResponse({'status': 'success'})

class ResetPassword(View):
    def post(self, request):
        data = request.POST
        email = request.POST.get('email')

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return JsonResponse({'status': 'error'})
        
        if (user.verify_code == False):
            return JsonResponse({'status': 'error'})
        
        user.set_password(data.get('password'))
        user.verify_code = False
        user.save()

        return JsonResponse({'status': 'success'})


class CreateMaterial(View):
    def post(self, request):
        if request.method == 'POST':
            form = CreateMaterialForm(request.POST, request.FILES)

            if form.is_valid():
                name = form.cleaned_data['name']
                
                try:
                    user = form.cleaned_data['user']
                except CustomUser.DoesNotExist:
                    return redirect(f'/new/?error=UserExist')

                if (EducationMaterial.objects.filter(name = name, user=user)):
                    return redirect(f'/new/?error=MaterialExist')


                education_material = form.save(commit=False)
                education_material.user = user  
                education_material.save()
                return redirect(f'/{user.name}')
            
            else:
                return redirect(f'/new/?error=NotValidation')


class MarkMaterial(APIView):
    def get(self, request):
        data = request.GET

        user = CustomUser.objects.get(id = data.get('user_id'))

        materials = MaterialMark.objects.filter(user=user)

        serialized_materials = serialize('json', materials)

        return JsonResponse({'status': 'success', 'materials':serialized_materials})


    def post(self, request):
        if request.method == 'POST':
            form = MaterialMarkForm(request.POST)
            if form.is_valid():
                owner_material = form.cleaned_data['material'].user

                mark_material = form.save(commit=False)

                if (MaterialMark.objects.get(material = mark_material.material, user = mark_material.user)):
                    return JsonResponse({'status': 'error'})

                mark_material.save()

                return redirect(f'/{owner_material.name}')
               
        else:
            return JsonResponse({'status': 'error'})
        
    def delete(sel, request):
        form = MaterialMarkForm(request.POST)
        if form.is_valid():
            material = form.cleaned_data['material']
            user = form.cleaned_data['user']
            mark_material = get_object_or_404(MaterialMark, material=material, user = user)

            mark_material.delete()
            return JsonResponse({'status': 'success'})





def GenerateMail(reset_code):
    message = f"<p>Здравствуйте, ваш код для восстановления пароля: {reset_code}</p>"
    
    return message