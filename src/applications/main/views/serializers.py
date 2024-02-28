from rest_framework import serializers
from applications.main.models import EducationMaterial
from applications.user.models import CustomUser


class MaterialMarkCountSerializer(serializers.Serializer):
    material_id = serializers.IntegerField()
    num_marks = serializers.IntegerField()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['photo_profile', 'name', 'fullName', 'userPlaceOfStudy', 'type_user']

class EducationMaterialSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = EducationMaterial
        fields = '__all__'


class EducationMaterialNumsSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    num_marks = serializers.SerializerMethodField()

    class Meta:
        model = EducationMaterial
        fields = '__all__'

    def get_num_marks(self, obj):
        return obj.num_marks

