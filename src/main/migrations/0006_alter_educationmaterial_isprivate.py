# Generated by Django 5.0.2 on 2024-02-07 22:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_educationmaterial_fullname_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='educationmaterial',
            name='isPrivate',
            field=models.BooleanField(default=True, verbose_name='Публичный ли?'),
        ),
    ]
