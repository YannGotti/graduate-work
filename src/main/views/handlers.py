from django.shortcuts import render, redirect, HttpResponse
from django.http import JsonResponse
from django.views.generic.base import View
from django.contrib.auth import login
from user.models import CustomUser
from ..smtp import SMTPServer
from ..forms import CreateMaterialForm
import random

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

            print(request.FILES)
            print(request.POST)

            form = CreateMaterialForm(request.POST, request.FILES)
            if form.is_valid():

                education_material = form.save(commit=False)
                education_material.user = request.user  
                education_material.save()
                print('yes')
                return JsonResponse({'status': 'success'})
            else:
                form = CreateMaterialForm()

            return JsonResponse({'status': 'error'})

def GenerateMail(reset_code):
    message = f"<p>Здравствуйте, ваш код для восстановления пароля: {reset_code}</p>"
    
    return message