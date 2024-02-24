import random
import json

from django.shortcuts import redirect, get_object_or_404
from django.http import JsonResponse
from django.views.generic.base import View
from django.contrib.auth import login
from django.core.serializers import serialize

from applications.user.models import CustomUser
from applications.main.models import EducationMaterial, MaterialMark
from applications.main.forms import CreateMaterialForm, MaterialMarkForm
from applications.main.smtp import SMTPServer

from rest_framework.views import APIView

from django.db.models import F

class RegisterUser(View):
    def post(self, request):
        data = json.loads(request.body)

        if (CustomUser.objects.filter(email = data.get("email"))):
            return JsonResponse({'status': False})

        
        if (CustomUser.objects.filter(username = data.get("email"))):
            return JsonResponse({'status': False})

        
        if (CustomUser.objects.filter(name = data.get("name"))):
            return JsonResponse({'status': False})

        
        user = CustomUser(
            username = data.get('email'),
            email = data.get('email'),
            userPlaceOfStudy = data.get('userPlaceOfStudy'),
            name = data.get('name'),
            password = data.get('password'),
            type_user = data.get('type_user'), 
            fullName= data.get('fullName')
            )
        
        user.set_password(data.get('password'))
        user.save()

        login(self.request, user)
        return JsonResponse({'status': True})


class SendResetPassword(View):
    def post(self, request):
        data = json.loads(request.body)
        email = data.get('email')
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return JsonResponse({'status': False})
        
        reset_code = str(random.randint(100000, 999999))
        user.reset_code = reset_code
        user.verify_code = False
        user.save()

        smtp_server = SMTPServer()
        smtp_server.send_message(f'Ваша учетная запись - {user.username}. АКТИВАЦИЯ АККАУНТА', GenerateMail(reset_code), user.email, html_content = None)

        return JsonResponse({'status': True})


class VerifyCode(View):
    def post(self, request):
        data = json.loads(request.body)
        email = data.get('email')
        reset_code = data.get('reset_code')
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return JsonResponse({'status': False})
        
        
        if (user.reset_code != reset_code):
            user.verify_code = False
            user.save()
            return JsonResponse({'status': False})
        else:
            user.verify_code = True
            user.save()
            return JsonResponse({'status': True})


class ResetPassword(View):
    def post(self, request):
        data = json.loads(request.body)
        email = data.get('email')

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return JsonResponse({'status': False})
        
        if (user.verify_code == False):
            return JsonResponse({'status': False})
        
        user.set_password(data.get('password'))
        user.verify_code = False
        user.save()

        return JsonResponse({'status': True})


class Material(APIView):
    def post(self, request):
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
            
    def put(self, request, material_id):
        if request.method == 'PUT':
            material = get_object_or_404(EducationMaterial, id=material_id)
            form = CreateMaterialForm(request.POST, request.FILES, instance=material)


            if form.is_valid():
                form.save()
                material_name = form.cleaned_data['name']
                return JsonResponse({'status': True, 'material_name': material_name})
            else:
                return JsonResponse({'status': False, 'error': 'Проверьте правильность ввода полей'})
        else:
            return JsonResponse({'status': True})
        
    
    def delete(self, request, material_id):
        if request.method == 'DELETE':
            material = get_object_or_404(EducationMaterial, id=material_id)
            material.delete()
            return JsonResponse({'status': True, 'username': material.user.name})
        else:
            return JsonResponse({'status': False})


class MarkMaterial(APIView):
    def get(self, request):
        data = request.GET

        user = CustomUser.objects.get(id = data.get('user_id'))

        materials = MaterialMark.objects.filter(user=user)

        serialized_materials = serialize('json', materials)

        return JsonResponse({'status': True, 'materials':serialized_materials})


    def post(self, request):
        if request.method == 'POST':
            form = MaterialMarkForm(request.POST)
            if form.is_valid():
                owner_material = form.cleaned_data['material'].user

                mark_material = form.save(commit=False)

                if (MaterialMark.objects.filter(material = mark_material.material, user = mark_material.user)):
                    return redirect(f'/{owner_material.name}')

                mark_material.save()

                return redirect(f'/{owner_material.name}')
               
        else:
            return JsonResponse({'status': False})
        
    def delete(sel, request):
        form = MaterialMarkForm(request.POST)
        if form.is_valid():
            material = form.cleaned_data['material']
            user = form.cleaned_data['user']

            try:
                mark_material = MaterialMark.objects.filter(material = material, user = user)
            except MaterialMark.DoesNotExist:
                return redirect(f'/{material.name}')
            
            mark_material.delete()
            return JsonResponse({'status': True})

class SearchUserMaterial(APIView):
    def get(self, request):
        data = request.GET

        materials = []

        users = CustomUser.objects.all()[:5].values('name', 'photo_profile')
        

        if (data.get('username')):
            users = (
                CustomUser.objects
                .filter(name__icontains=data.get('username'))[:5]
                .values('name', 'photo_profile')
        )

        if (data.get('material')):
            materials = (
                EducationMaterial.objects
                .filter(isPublic=True, name__icontains=data.get('material'))[:10]
                .annotate(username=F('user__name'))
                .values('name', 'icon', 'username')
            )

        if (data.get('username')):

            try:
                user = CustomUser.objects.get(name=data.get('username'))

                materials = (
                EducationMaterial.objects
                .filter(user=user, isPublic=True, name__icontains=data.get('material'))[:10]
                .annotate(username=F('user__name'))
                .values('name', 'icon', 'username')
            )
            except:
                materials = []
            

        return JsonResponse({
            'status': True,
            'users': json.dumps(list(users)),
            'materials': json.dumps(list(materials))
        })

def GenerateMail(reset_code):
    message = f"<p>Здравствуйте, ваш код для восстановления пароля: {reset_code}</p>"
    
    return message