from django.shortcuts import render, redirect, HttpResponse, get_object_or_404
from django.views.generic.base import View
from user.models import CustomUser
from ..models import EducationMaterial

from django.template import RequestContext

class MainPage(View):
    def get(self, request):
        return render(request, 'main/index.html' , context={'title':'Главная'})
    
class AuthPage(View):
    def get(self, request):
        return render(request, 'main/auth.html' , context={'title':'Вход'})
    

class ProfilePage(View):
    def get(self, request, username):
        
        user = get_object_or_404(CustomUser, name=username)

        materials = EducationMaterial.objects.filter()
        
        return render(request, 'main/profile.html', context={'user_profile':user, 'title': username})
    
class NewMaterial(View):
    def get(self, request):
        return render(request, 'main/newMaterial.html', context={'title':'Новый материал'})

def custom_handler404(request, exception):
    response = render('404.html', context={'title':'Страница не найдена.'},
                              context_instance=RequestContext(request))
    response.status_code = 404
    return response

