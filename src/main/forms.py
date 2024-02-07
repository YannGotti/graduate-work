from django import forms
from .models import EducationMaterial

class CreateMaterialForm(forms.ModelForm):
    class Meta:
        model = EducationMaterial
        fields = ['name', 'description', 'isPrivate', 'file', 'user', 'theme', 'author', 'source', 'fullName']