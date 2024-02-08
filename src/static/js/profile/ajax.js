
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
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
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


function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}