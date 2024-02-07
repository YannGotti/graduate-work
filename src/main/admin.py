from django.contrib import admin
from .models import EducationMaterial

@admin.register(EducationMaterial)
class EducationMaterialAdminPanel(admin.ModelAdmin):
    list_display = ('name', 'description', 'isPrivate', 'file', 'user', 'theme', 'author', 'source', 'fullName')