# Generated by Django 5.0.2 on 2024-02-07 12:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0011_alter_customuser_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='type_user',
            field=models.CharField(choices=[('Преподаватель', 'Преподаватель'), ('Учащийся', 'Учащийся')], default='учащийся', max_length=20, verbose_name='Тип пользователя'),
        ),
    ]