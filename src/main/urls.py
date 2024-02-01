from django.urls import path
from . import views

urlpatterns = [
    path('', views.MainPage.as_view()),
    path('auth/', views.AuthPage.as_view(), name='auth_page'),
    path('auth/reset_password/', views.SendResetPassword.as_view()),
    path('auth/reset_password/reset/', views.ResetPassword.as_view()),
    path('auth/reset_password/verify_code/', views.VerifyCode.as_view()),
    path('auth/register/', views.RegisterUser.as_view()),
]