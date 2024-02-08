from django import forms
from .models import EducationMaterial, MaterialMark

class CreateMaterialForm(forms.ModelForm):
    class Meta:
        model = EducationMaterial
        fields = ['name', 'description', 'isPublic', 'file', 'user', 'theme', 'author', 'source', 'fullName', 'icon']


class MaterialMarkForm(forms.ModelForm):
    class Meta:
        model = MaterialMark
        fields = ['user', 'material']