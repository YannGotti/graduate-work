from django.shortcuts import render, redirect, HttpResponse
from django.http import JsonResponse
from django.core import serializers
from django.views.generic.base import View
from user.models import CustomUser

class MainPage(View):
    def get(self, request):
        return render(request, 'main/index.html')
    
class AuthPage(View):
    def get(self, request):
        return render(request, 'main/auth.html')
    

class RegisterUser(View):
    def post(self, request):
        data = request.POST

        if (CustomUser.objects.filter(email = data.get("email"))):
            return HttpResponse('Not')
        
        if (CustomUser.objects.filter(username = data.get("email"))):
            return HttpResponse('Not')
        
        user = CustomUser(username = data.get('email'), email = data.get('email'), userPlaceOfStudy = data.get('userPlaceOfStudy'), password = data.get('password'),
                        type_user = data.get('type_user'), fullName= data.get('fullName'))
        user.set_password(data.get('password'))
        user.save()

        return HttpResponse('Ok')