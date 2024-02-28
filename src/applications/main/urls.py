from django.urls import path
from .views.pages import *
from .views.handlers import *

handler404 = custom_handler404

urlpatterns = [
    path('', MainPage.as_view(), name='main_page'),
    path('auth/', AuthPage.as_view(), name='auth_page'),
    path('new/', NewMaterial.as_view(), name='new_material'),
    path('TermsOfUse/', TermsOfUse.as_view(), name='TermsOfUse'),
    path('AboutUs/', AboutUs.as_view(), name='AboutUs'),
    path('<username>/', ProfilePage.as_view(), name='profile_page'),
    path('<username>/<material_name>/', MaterialPage.as_view()),


    path('auth/reset_password', SendResetPassword.as_view()),
    path('auth/reset_password/reset', ResetPassword.as_view()),
    path('auth/reset_password/verify_code', VerifyCode.as_view()),
    path('auth/register', RegisterUser.as_view()),

    path('new/create', Material.as_view(), name='create_material'),
    path('material/edit/<material_id>/', Material.as_view()),
    path('material/delete/<material_id>/', Material.as_view()),

    path('mark', MarkMaterial.as_view(), name='mark_material'),

    path('api/search', SearchUserMaterial.as_view()),
    path('api/getIsFollowing', FollowingUsers.as_view()),
    path('api/following_user', FollowingUsers.as_view()),

    path('api/getContentTrackedUsers', ContentTrackedUsers.as_view()),
    path('api/getLastPopularMaterials', LastPopularMaterials.as_view()),

    path('api/uploadProfileImage', UploadProfileImage.as_view()),

]