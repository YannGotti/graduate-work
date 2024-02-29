
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


async function getIsFollowingUser(user, following) {
    const buttonFollowingUser = document.getElementById('buttonFollowingUser');
    let status;

    try {
        const response = await fetch(`/api/getIsFollowing?username=${user}&following=${following}`);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();

        if (data.status) {
            buttonFollowingUser.innerText = 'Отписаться';
            status = data.status;
        }

        if (!data.status) {
            buttonFollowingUser.innerText = 'Подписаться';
            status = data.status;
        }

        return status;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

async function followingUser(user, following) {
        const status = await getIsFollowingUser(user, following);
        
        try {
            const response = await fetch('/api/following_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "X-CSRFToken": Cookies.get('csrftoken')
                },
                body: JSON.stringify({
                    username: user,
                    following: following,
                    status: status
                }),
            });
        
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
        
            const data = await response.json();
        
            if (data.status) {
                location.reload()
            }
        
            return status;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
}


function uploadProfileImage() {
    const fileInput = document.getElementById('profileImageInput');

    if (fileInput.files.length == 0) {
        return;
    }

    const formData = new FormData();
    formData.append('profile_image', fileInput.files[0]);

    fetch('/api/uploadProfileImage', {
        method: 'POST',
        headers: {
            "X-CSRFToken": Cookies.get('csrftoken')
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        location.reload();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
    
}

function editInformationUser(){

    const formData = new FormData();
    formData.append('email', document.getElementById('email_input').value);
    formData.append('fullName', document.getElementById('fullname_input').value);
    formData.append('name', document.getElementById('name_input').value);
    formData.append('userPlaceOfStudy', document.getElementById('study_input').value);

    fetch('/api/editInformationUser', {
        method: 'POST',
        headers: {
            "X-CSRFToken": Cookies.get('csrftoken')
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.status){
            location.replace('/' + document.getElementById('name_input').value + '?tab=settings');
        }
        return data;
    })
    .then(data => {
        if (!data.status){
            const field_validation_register = document.getElementById('field_validation_register');
            field_validation_register.innerText = 'Проверьте правильность ввода полей';
        }
        return data;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

}

function editPasswordUser(){

    const formData = new FormData();
    formData.append('old_password', document.getElementById('old_password_input').value);
    formData.append('new_password', document.getElementById('new_password_input').value);

    fetch('/api/editPasswordUser', {
        method: 'POST',
        headers: {
            "X-CSRFToken": Cookies.get('csrftoken')
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.status){
            console.log(data);
            location.reload();
        }
        return data;
    })
    .then(data => {
        if (!data.status){
            const field_validation_register = document.getElementById('field_validation_edit_password');
            field_validation_register.innerText = data.message;
        }
        return data;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

}

function isDeleteMaterial(){
    const validateButtonDeleteMaterial = document.getElementById('validateButtonDeleteMaterial');
    validateButtonDeleteMaterial.style.display = 'block';
}
