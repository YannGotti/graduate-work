from django.contrib import admin
from .models import EducationMaterial, MaterialMark

@admin.register(EducationMaterial)
class EducationMaterialAdminPanel(admin.ModelAdmin):
    list_display = ('name', 'description', 'isPublic', 'file', 'user', 'theme', 'author', 'source', 'fullName', 'icon')

@admin.register(MaterialMark)
class MaterialMarkAdminPanel(admin.ModelAdmin):
    list_display = ('user', 'material', 'created_at')