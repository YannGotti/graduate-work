from django.contrib import admin

from django.contrib.auth.admin import UserAdmin

from .models import CustomUser

@admin.register(CustomUser)
class UserAdminPanel(UserAdmin):
    model = CustomUser
    #list_display = ('username', 'email', 'profile_image', 'date_register')
    
    add_fieldsets = (
        *UserAdmin.add_fieldsets,
        (
            'Свои поля',
            {
                'fields': (
                    'photo_profile',
                    'email',
                    'date_register',
                    'type_user',
                    'fullName',
                    'name'
                )
            }
        )
    )

    fieldsets = (
        *UserAdmin.fieldsets,
        (
            'Свои поля',
            {
                'fields': (
                    'photo_profile',
                    'type_user',
                    'fullName',
                    'name'
                )
            }
        )
    )
    readonly_fields=(
        'date_register',
    )