from django.db import models


class EducationMaterial(models.Model):
    name = models.CharField('Название', max_length=150)
    fullName = models.TextField('Полное название', null=True, blank=True)
    description = models.TextField('Описание', null=True, blank=True)
    theme = models.CharField('Тематика/предмет', max_length=350)
    author = models.TextField('Автор', null=True, blank=True)
    source = models.TextField('Источник', null=True, blank=True)

    isPublic = models.BooleanField('Публичный ли?', default=True)

    file = models.FileField('Файл материала', upload_to='materials/', blank=True, null=True)

    icon = models.FileField('Иконка материала', upload_to='icons_materials/', default='icons_materials/default.png', blank=True, null=True)
    user = models.ForeignKey("user.CustomUser", verbose_name='Кому пренадлежит', on_delete=models.CASCADE)
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)

    def __str__(self):
        return f'{self.name}, {self.description}'

    class Meta:
        verbose_name = 'Материал'
        verbose_name_plural = 'Материалы'


class MaterialMark(models.Model):
    user = models.ForeignKey("user.CustomUser", verbose_name='Пользователь', on_delete=models.CASCADE)
    material = models.ForeignKey("main.EducationMaterial", verbose_name='Материал', on_delete=models.CASCADE)
    created_at = models.DateTimeField('Дата отслеживания', auto_now_add=True)

    def __str__(self):
        return f'{self.user}, {self.material}'

    class Meta:
        verbose_name = 'Закладка'
        verbose_name_plural = 'Закладки'


class FollowingUser(models.Model):
    owner = models.ForeignKey("user.CustomUser", related_name='following_users', on_delete=models.CASCADE)
    followingUser = models.ForeignKey("user.CustomUser", related_name='followers', on_delete=models.CASCADE)
    created_at = models.DateTimeField('Дата отслеживания', auto_now_add=True)

    def __str__(self):
        return f'{self.owner}, {self.created_at}'

    class Meta:
        verbose_name = 'Отслеживание'
        verbose_name_plural = 'Отслеживаемые'
