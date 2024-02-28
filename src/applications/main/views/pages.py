import json
from django.shortcuts import render, get_object_or_404
from django.views.generic.base import View
from applications.user.models import CustomUser
from applications.main.models import EducationMaterial, FollowingUser
from django.template import RequestContext
from .service import create_json_list, get_materials_marks_list, get_following_and_followers


class MainPage(View):
    def get(self, request):
        return render(request, 'main/index.html' , context={'title':'Главная'})

class TermsOfUse(View):
    def get(self, request):
        return render(request, 'TermsOfUse.html' , context={'title':'Пользовательское соглашение'})

class AboutUs(View):
    def get(self, request):
        return render(request, 'AboutUs.html' , context={'title':'Обратная связь'})

class AuthPage(View):
    def get(self, request):
        return render(request, 'main/auth.html' , context={'title':'Вход'})

class ProfilePage(View):
    def get(self, request, username):
        user = get_object_or_404(CustomUser, name=username)

        tab_param = request.GET.get('tab')

        if (tab_param == 'stars'):
            return ProfilePageFollowing(self, request, username, user, tab_param)
        
        elif (tab_param == 'following' or tab_param == 'followers'):
            return ProfileFollowUsers(self, request, user, tab_param)

        else:
            return ProfilePageMain(self, request, username, user)


def ProfileFollowUsers(self, request, user, tab):
    followers, following = get_following_and_followers(user)

    follows = []

    if (tab == 'following'):
        follows = FollowingUser.objects.filter(followingUser = user)

    if (tab == 'followers'):
        follows = FollowingUser.objects.filter(owner = user)

    context = {
            'user_profile': user,
            'title': 'Подписки',
            'tab': tab,
            'followers': followers,
            'following': following,
            'follows' : follows
        }

    return render(request, 'profile/profile_content.html', context)

def ProfilePageMain(self, request, username, user, tab = 'main'):
    materials = EducationMaterial.objects.filter(user=user)

    materials, marks = get_materials_marks_list(user, request, materials)

    followers, following = get_following_and_followers(user)

    context = {
        'user_profile': user,
        'title': username,
        'tab': tab,
        'materials': materials,
        'followers': followers,
        'following': following,
        'marks': json.dumps(marks, sort_keys=True) if marks else []
    }

    return render(request, 'profile/profile_content.html', context)

def ProfilePageFollowing(self, request, username, user, tab):
        data = request.GET
        materials = EducationMaterial.objects.all()

        if data.get('filter'):
            materials = materials.filter(theme=data.get('filter'))

        marks, ids = create_json_list(materials, user, True)
        materials = materials.exclude(id__in=ids).filter(isPublic = True)

        followers, following = get_following_and_followers(user)
        
        context = {
            'user_profile': user,
            'title': f'{username} - Отслеживание',
            'tab' : tab,
            'materials': materials,
            'followers': followers,
            'following': following,
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


def custom_handler404(request, exception):
    response = render('404.html', context={'title':'Страница не найдена.'},
                              context_instance=RequestContext(request))
    response.status_code = 404
    return response

