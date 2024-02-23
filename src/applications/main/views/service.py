from applications.main.models import EducationMaterial, MaterialMark

def create_json_list(materials, user, include_ids=False):
    marks = []
    ids = []

    for material in materials:
        is_tracked = MaterialMark.objects.filter(user=user, material=material).exists()


        if not is_tracked and include_ids:
            ids.append(material.id)

        count_mark = MaterialMark.objects.filter(material=material).count()
        data = {
            'material_id': material.id,
            'is_tracked': is_tracked,
            'count_mark': count_mark
        }

        marks.append(data)

    if include_ids:
        return marks, ids
    else:
        return marks

def get_materials_marks_list(user, request, materials):
    data = request.GET

    if user != request.user:
        materials = materials.filter(isPublic=True)

    if data.get('filter'):
        materials = materials.filter(theme=data.get('filter'))

    if user != request.user:
        try:
            marks = create_json_list(materials, request.user)
        except Exception as e:
            marks = []
    else:
        if user.type_user == "Преподаватель":
            marks = create_json_list(materials, user)
        else:
            user_subscriptions = MaterialMark.objects.filter(user=user)
            materials = EducationMaterial.objects.filter(id__in=user_subscriptions.values('material'))
            marks, ids = create_json_list(materials, user, True)
            materials = materials.exclude(id__in=ids)

    return materials, marks