
function deleteItem(id) {
    const del_mark_user_input = document.getElementById('del_mark_user_input_' + id);
    const del_mark_material_input = document.getElementById('del_mark_material_input_' + id);

    const formData = new FormData();
    formData.append('user', del_mark_user_input.value);
    formData.append('material', del_mark_material_input.value);

    fetch($('#deleteForm').attr('action'), {
        method: 'DELETE',
        body: formData,
        processData: false,
        contentType: false,
        headers: {
            "X-CSRFToken": Cookies.get('csrftoken')
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(response => {
        if (response.status) {
            location.reload();
        } else {
            
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}

function editMaterialPut(username, id_material) {
    const formData = new FormData(document.getElementById('editMaterialForm'));
    const descriptionValue = document.getElementById('description_input').value;
    const validation_form = document.getElementById('validation_form');

    formData.append('description', descriptionValue);

    fetch(`/material/edit/${id_material}/`, {
        method: 'PUT',
        body: formData,
        headers: {
            "X-CSRFToken": Cookies.get('csrftoken')
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!data.status) validation_form.innerText = data.error;
        return data;
    })
    .then(data => {
        if (data.status) location.replace(`/${username}/${data.material_name}/`);
        return data;
    })
    .catch(error => {
        validation_form.innerText = 'Непредвиденная ошибка. Пожалуйста, попробуйте позже.';
        console.error('Ошибка:', error);
    });
}

function deleteMaterialDel(id_material) {
    fetch(`/material/delete/${id_material}/`, {
        method: 'DELETE',
        headers: {
            "X-CSRFToken": Cookies.get('csrftoken')
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        location.replace(`/${data.username}`);
        return data;
    })
    .catch(error => {
        console.error('Ошибка:', error);
        const validation_form = document.getElementById('validation_form');
        validation_form.innerText = 'Непредвиденная ошибка. Пожалуйста, попробуйте позже.';
    });
}


function getSearchMaterial() {
    const searchQuery = searchInput.value;

    const result = parseUsernameMaterial(searchQuery);

    fetch(`/api/search?username=${result.username.substring(1)}&material=${result.material}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            drawSearchMaterialsUsers(JSON.parse(data.materials), JSON.parse(data.users));
            return data
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function isDeleteMaterial(){
    const validateButtonDeleteMaterial = document.getElementById('validateButtonDeleteMaterial');
    validateButtonDeleteMaterial.style.display = 'block';
}
