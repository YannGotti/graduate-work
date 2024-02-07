from django.urls import path
from .views.pages import *
from .views.handlers import *

handler404 = custom_handler404

urlpatterns = [
    path('', MainPage.as_view(), name='main_page'),
    path('auth/', AuthPage.as_view(), name='auth_page'),
    path('<username>', ProfilePage.as_view(), name='profile_page'),


    path('auth/reset_password/', SendResetPassword.as_view()),
    path('auth/reset_password/reset/', ResetPassword.as_view()),
    path('auth/reset_password/verify_code/', VerifyCode.as_view()),
    path('auth/register/', RegisterUser.as_view()),
]