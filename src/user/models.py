from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    photo_profile = models.ImageField('Фото профиля пользователя', upload_to='photo_profile/', default='photo_profile/default_profile.png', blank=True, null=True)
    date_register = models.DateField('Дата регистрации', auto_now_add=True)
    email = models.EmailField('Почта пользователя', max_length=254)
    type_user = models.CharField('Тип пользователя', max_length=50)
    userPlaceOfStudy = models.CharField('Место обучения', max_length=250)
    fullName = models.CharField('ФИО пользователя', max_length=250)