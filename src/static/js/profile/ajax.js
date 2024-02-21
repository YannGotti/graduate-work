
function deleteItem(id) {
    const csrftoken = Cookies.get('csrftoken');
    const del_mark_user_input = document.getElementById('del_mark_user_input_' + id);
    const del_mark_material_input = document.getElementById('del_mark_material_input_' + id);

    const formData = new FormData();
    formData.append('user', del_mark_user_input.value);
    formData.append('material', del_mark_material_input.value);

    $.ajax({
        url: $('#deleteForm').attr('action'),
        method: 'delete',
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            "X-CSRFToken": csrftoken  
        },
        success: function (response) {
            if (response.status == "error"){
            }

            if (response.status == "success") {
                location.reload()
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}


function editMaterialPut(username, id_material) {
    const csrftoken = Cookies.get('csrftoken');
    const formData = new FormData(document.getElementById('editMaterialForm'));

    formData.append('description', document.getElementById('description_input').value);

    $.ajax({
        url: `/material/edit/${id_material}/`, 
        type: 'PUT',
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            "X-CSRFToken": csrftoken  
        },
        success: function(data) {
            location.replace(`/${username}/${data.name}`);
        },
        error: function(error) {
            console.error('Error:', error);
            const validation_form = document.getElementById('validation_form');
            validation_form.innerText = 'Непредвиденная ошибка. Пожалуйста, попробуйте позже.';
        }
    });
}

function deleteMaterialDel(id_material){
    const csrftoken = Cookies.get('csrftoken');

    $.ajax({
        url: `/material/delete/${id_material}/`, 
        type: 'DELETE',
        headers: {
            "X-CSRFToken": csrftoken  
        },
        success: function(data) {
            location.replace(`/${data.username}`);
        },
        error: function(error) {
            console.error('Error:', error);
            const validation_form = document.getElementById('validation_form');
            validation_form.innerText = 'Непредвиденная ошибка. Пожалуйста, попробуйте позже.';
        }
    });

}



function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}


function isDeleteMaterial(){
    const validateButtonDeleteMaterial = document.getElementById('validateButtonDeleteMaterial');
    validateButtonDeleteMaterial.style.display = 'block';
}
