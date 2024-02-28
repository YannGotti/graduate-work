import random
import json

from django.shortcuts import redirect, get_object_or_404
from django.http import JsonResponse
from django.views.generic.base import View
from django.contrib.auth import login
from django.core.serializers import serialize
from django.db.models import Count
from django.utils import timezone

from applications.user.models import CustomUser
from applications.main.models import EducationMaterial, MaterialMark, FollowingUser
from applications.main.forms import CreateMaterialForm, MaterialMarkForm
from applications.main.smtp import SMTPServer
from applications.main.views.serializers import EducationMaterialSerializer, EducationMaterialNumsSerializer
from applications.main.views.service import get_search_materials

from rest_framework.views import APIView
from rest_framework.response import Response

from django.core.files.storage import default_storage


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
            old_icon_path = material.icon.path if material.icon else None
            old_file_path = material.file.path if material.file else None
            icon_name = material.icon.name
            icon_file = request.FILES.get('icon', None)
            file_file = request.FILES.get('file', None)

            form = CreateMaterialForm(request.POST, request.FILES, instance=material)
            if form.is_valid():
                material = form.save(commit=False)
                material.save()


                if old_icon_path and icon_file and not icon_name.startswith('icons_materials/default.png'): 
                    default_storage.delete(old_icon_path)

                if old_file_path and file_file:
                    default_storage.delete(old_file_path)

                material_name = form.cleaned_data['name']
                return JsonResponse({'status': True, 'material_name': material_name})
            else:
                return JsonResponse({'status': False, 'error': 'Проверьте правильность ввода полей'})
        else:
            return JsonResponse({'status': True})
        
    
    def delete(self, request, material_id):
        if request.method == 'DELETE':
            material = get_object_or_404(EducationMaterial, id=material_id)
            old_icon_path = material.icon.path if material.icon else None
            default_storage.delete(old_icon_path)
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

        materials = get_search_materials(data, materials, users)

        return JsonResponse({
            'status': True,
            'users': json.dumps(list(users)),
            'materials': json.dumps(list(materials))
        })

class FollowingUsers(APIView):
    def get(self, request):
        username = request.GET.get('username')
        following_username = request.GET.get('following')

        owner = get_object_or_404(CustomUser, name=username)
        following_user = get_object_or_404(CustomUser, name=following_username)

        follow = FollowingUser.objects.filter(owner=owner, followingUser=following_user).exists()

        return Response({'status': follow})

    def post(self, request):
        username = request.data.get('username')
        following_username = request.data.get('following')
        status = request.data.get('status')

        owner = get_object_or_404(CustomUser, name=username)
        following_user = get_object_or_404(CustomUser, name=following_username)

        if status:
            follow = FollowingUser.objects.filter(owner=owner, followingUser=following_user).first()
            if follow:
                follow.delete()
        else:
            follow, created = FollowingUser.objects.get_or_create(owner=owner, followingUser=following_user)

        return Response({'status': True})


class UploadProfileImage(APIView):
    def post(self, request):
        if request.method == 'POST':
            uploaded_file = request.FILES.get('profile_image')
            if uploaded_file:
                try:
                    user = request.user

                    old_photo_path = user.photo_profile.path
                    if(not user.photo_profile.name.startswith('photo_profile/default_profile.png')):
                        default_storage.delete(old_photo_path)

                    user.photo_profile = uploaded_file
                    user.save()
                except:
                    return Response({
                        'status': False,
                        })

                return Response({
                    'status': True,
                    })
    
        return Response({
            'status': False,
            })

class ContentTrackedUsers(APIView):
    def get(self, request):
        try:
            user = request.user
        except:
            return Response({'status': False})

        subscribed_users = FollowingUser.objects.filter(owner_id=user.id).values_list('followingUser_id', flat=True)
    
        materials = EducationMaterial.objects.filter(isPublic=True, user_id__in=subscribed_users).order_by('-created_at')

        serializer = EducationMaterialSerializer(materials, many=True)

        return Response({
            'status': True,
            'materials': serializer.data
            })
    

class LastPopularMaterials(APIView):
    def get(self, request, days=7):
        start_date = timezone.now() - timezone.timedelta(days=days)

        materials = EducationMaterial.objects.filter(
            materialmark__created_at__gte=start_date
        ).annotate(num_marks=Count('materialmark')).order_by('-num_marks')[:3]

        serializer = EducationMaterialNumsSerializer(materials, many=True)

        return Response({
            'status': True,
            'materials' : serializer.data,
            })


def GenerateMail(reset_code):
    message = f"<p>Здравствуйте, ваш код для восстановления пароля: {reset_code}</p>"
    
    return message