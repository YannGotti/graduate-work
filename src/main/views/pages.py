from django.shortcuts import render, redirect, HttpResponse, get_object_or_404
from django.views.generic.base import View
from user.models import CustomUser
from main.models import EducationMaterial, MaterialMark
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


        if (user == request.user):
            if (user.type_user == "Преподаватель"):
                materials = EducationMaterial.objects.filter(user=user)
                marks = []

                for material in materials:
                    is_tracked = MaterialMark.objects.filter(user=user, material=material).exists()
                    count_mark = MaterialMark.objects.filter(material=material).count()
                    data = {
                        'material_id' : material.id,
                        'is_tracked' : is_tracked,
                        'count_mark' : count_mark
                    }

                    marks.append(data)

                marks = json.dumps(marks, sort_keys=True)

                return render(request, 'main/profile.html', context={'user_profile':user, 'title': username, 'materials': materials, 'marks': marks})
            else:
                materials = EducationMaterial.objects.all()

                marks = []

                ids = []

                for material in materials:
                    is_tracked = MaterialMark.objects.filter(user=user, material=material).exists()

                    if (not is_tracked):
                        ids.append(material.id)

                    count_mark = MaterialMark.objects.filter(material=material).count()
                    data = {
                        'material_id' : material.id,
                        'is_tracked' : is_tracked,
                        'count_mark' : count_mark
                    }

                    marks.append(data)

                marks = json.dumps(marks, sort_keys=True)

                materials = EducationMaterial.objects.exclude(id__in=ids)
                
                return render(request, 'main/profile.html', context={'user_profile':user, 'title': username, 'materials': materials, 'marks': marks})
            
        else:
            materials = EducationMaterial.objects.filter(user=user, isPublic=True)

            try:
                marks = []

                for material in materials:
                    is_tracked = MaterialMark.objects.filter(user=request.user, material=material).exists()
                    count_mark = MaterialMark.objects.filter(material=material).count()
                    data = {
                        'material_id' : material.id,
                        'is_tracked' : is_tracked,
                        'count_mark' : count_mark
                    }

                    marks.append(data)

                marks = json.dumps(marks, sort_keys=True)
            except:
                return render(request, 'main/profile.html', context={'user_profile':user, 'title': username})
            
            return render(request, 'main/profile.html', context={'user_profile':user, 'title': username, 'materials': materials, 'marks': marks})


    
class NewMaterial(View):
    def get(self, request):
        return render(request, 'main/newMaterial.html', context={'title':'Новый материал'})

def custom_handler404(request, exception):
    response = render('404.html', context={'title':'Страница не найдена.'},
                              context_instance=RequestContext(request))
    response.status_code = 404
    return response

