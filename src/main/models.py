from django.db import models


class EducationMaterial(models.Model):
    name = models.CharField('Название', max_length=150)
    fullName = models.CharField('Полное название', max_length=300, null=True)
    description = models.CharField('Описание', max_length=350, null=True)
    theme = models.CharField('Тематика/предмет', max_length=350)
    author = models.CharField('Автор', max_length=350, null=True)
    source = models.URLField('Источник', max_length=300, null=True)

    isPrivate = models.BooleanField('Приватный ли?', default=False)

    file = models.FileField('Файл материала', upload_to='materials/', blank=True, null=True)

    user = models.ForeignKey("user.CustomUser", verbose_name='Кому пренадлежит', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name}, {self.description}'

    class Meta:
        verbose_name = 'Материал'
        verbose_name_plural = 'Материалы'

#class FilmsOnMainPage(models.Model):
#    film_id = models.IntegerField('ID Фильма')
#    category = models.CharField('Категория', max_length=30)
#
#    def __str__(self):
#        return f'{self.film_id}, {self.category}'
#
#    class Meta:
#        verbose_name = 'Фильм на главной странице'
#        verbose_name_plural = 'Фильмы на главной сранице'
