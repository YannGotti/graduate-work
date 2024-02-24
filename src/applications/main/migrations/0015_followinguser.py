# Generated by Django 4.2.2 on 2024-02-24 16:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0014_alter_educationmaterial_source'),
    ]

    operations = [
        migrations.CreateModel(
            name='FollowingUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Дата отслеживания')),
                ('followingUser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='followers', to=settings.AUTH_USER_MODEL, verbose_name='Кого отслеживает')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='following_users', to=settings.AUTH_USER_MODEL, verbose_name='Кто отслеживает')),
            ],
            options={
                'verbose_name': 'Отслеживание',
                'verbose_name_plural': 'Отслеживаемые',
            },
        ),
    ]