from django.urls import path
from . import views

urlpatterns = [
    path('', views.MainPage.as_view()),
    path('auth/', views.AuthPage.as_view(), name='auth_page'),
    path('auth/register/', views.RegisterUser.as_view()),
]