from django.shortcuts import render, redirect, HttpResponse, get_object_or_404
from django.views.generic.base import View
from applications.user.models import CustomUser
from applications.main.models import EducationMaterial, MaterialMark
from django.template import RequestContext
import json


class MainPage(View):
    def get(self, request):
        return render(request, 'main/index.html' , context={'title':'Главная'})
    
class AuthPage(View):
    def get(self, request):
        return render(request, 'main/auth.html' , context={'title':'Вход'})
    

class ProfilePage(View):
    def get(self, request, username):
        user = get_object_or_404(CustomUser, name=username)

        tab_param = request.GET.get('tab')

        if (tab_param == 'star'):
            return ProfilePageFollowing(self, request, username, user)

        else:
            return ProfilePageMain(self, request, username, user)



def ProfilePageMain(self, request, username, user):
    if user == request.user:
        if user.type_user == "Преподаватель":
            materials = EducationMaterial.objects.filter(user=user)
            marks = create_json_list(materials, user)
        else:
            materials = EducationMaterial.objects.all()
            marks, ids = create_json_list(materials, user, True)
            materials = EducationMaterial.objects.exclude(id__in=ids)
    else:
        materials = EducationMaterial.objects.filter(user=user, isPublic=True)
        try:
            marks = create_json_list(materials, request.user)
        except:
            marks = []


    context = {
        'user_profile': user,
        'title': username,
        'materials': materials,
        'tab' : 'main',
        'marks': json.dumps(marks, sort_keys=True) if marks else []
    }

    return render(request, 'profile/main_profile.html', context)

def ProfilePageFollowing(self, request, username, user):
        
        context = {
            'user_profile': user,
            'title': username,
            'tab' : 'main',
        }
        return render(request, 'profile/main_profile.html', context=context)

    
class NewMaterial(View):
    def get(self, request):
        return render(request, 'main/newMaterial.html', context={'title':'Новый материал'})


def create_json_list(materials, user, include_ids=False):
    marks = []
    ids = []

    for material in materials:
        is_tracked = MaterialMark.objects.filter(user=user, material=material).exists()

        if not is_tracked and include_ids:
            ids.append(material.id)

        count_mark = MaterialMark.objects.filter(material=material).count()
        data = {
            'material_id': material.id,
            'is_tracked': is_tracked,
            'count_mark': count_mark
        }

        marks.append(data)

    if include_ids:
        return marks, ids
    else:
        return marks



def custom_handler404(request, exception):
    response = render('404.html', context={'title':'Страница не найдена.'},
                              context_instance=RequestContext(request))
    response.status_code = 404
    return response

