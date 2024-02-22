import json
from django.shortcuts import render, redirect, HttpResponse, get_object_or_404
from django.views.decorators.cache import cache_control
from django.utils.decorators import method_decorator
from django.views.generic.base import View
from applications.user.models import CustomUser
from applications.main.models import EducationMaterial, MaterialMark
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

        tab_param = request.GET.get('tab')

        if (tab_param == 'stars'):
            return ProfilePageFollowing(self, request, username, user)

        else:
            return ProfilePageMain(self, request, username, user)

def ProfilePageMain(self, request, username, user):
    data = request.GET
    materials = EducationMaterial.objects.filter(user=user)

    if user != request.user:
        materials = materials.filter(isPublic=True)

    if data.get('filter'):
        materials = materials.filter(theme=data.get('filter'))

    if user != request.user:
        try:
            marks = create_json_list(materials, request.user)
        except Exception as e:
            marks = []
    else:
        if user.type_user == "Преподаватель":
            marks = create_json_list(materials, user)
        else:
            user_subscriptions = MaterialMark.objects.filter(user=user)
            materials = EducationMaterial.objects.filter(id__in=user_subscriptions.values('material'))
            marks, ids = create_json_list(materials, user, True)
            materials = materials.exclude(id__in=ids)


    context = {
        'user_profile': user,
        'title': username,
        'tab': 'main',
        'materials': materials,
        'marks': json.dumps(marks, sort_keys=True) if marks else []
    }

    return render(request, 'profile/profile_content.html', context)

def ProfilePageFollowing(self, request, username, user):
        data = request.GET
        materials = EducationMaterial.objects.all()

        if data.get('filter'):
            materials = materials.filter(theme=data.get('filter'))

        marks, ids = create_json_list(materials, user, True)
        materials = materials.exclude(id__in=ids)
        
        context = {
            'user_profile': user,
            'title': f'{username} - Отслеживание',
            'tab' : 'stars',
            'materials': materials,
            'marks': json.dumps(marks, sort_keys=True) if marks else []
        }
        return render(request, 'profile/profile_content.html', context=context)

class MaterialPage(View):
    def get(self, request, username, material_name):
        user = get_object_or_404(CustomUser, name=username)
        material = get_object_or_404(EducationMaterial, name=material_name)

        tab_param = request.GET.get('tab')

        if (tab_param == 'settings'):
            return MaterialSettingsPage(self, request, user, material)

        else:
            return MaterialMainPage(self, request, user, material)
        
def MaterialSettingsPage(self, request, user, material):
    context = {
            'user_profile' : user,
            'material' : material,
            'tab' : 'settings',
            'title': f'Настройки {material.name}'
        }

    return render(request, 'profile/material.html', context=context)

def MaterialMainPage(self, request, user, material):
    context = {
            'user_profile' : user,
            'material' : material,
            'tab' : 'main',
            'title': material.name
        }

    return render(request, 'profile/material.html', context=context)

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

