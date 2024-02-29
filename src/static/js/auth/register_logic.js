

function registerNextStep() {
    hideElement('registration_form');
    hideElement('auth_buttons');
    hideElement('registration_next_button');

    showElement('registration_form_two_step');
}

function registerBackStep(){

    hideElement('registration_form_two_step');

    showElement('registration_form');
    showElement('auth_buttons');
    showElement('registration_next_button');
}

function hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.setProperty('display', 'none', 'important');
    }
}

function showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'block';
    }
}


function replaceTypeInDropdown(type){
    const type_input = document.getElementById('type_input');

    type_input.textContent = type.textContent;
}

function userRegistration() {
    const fieldValidation = document.getElementById('field_validation_register');

    const email = document.getElementById('email_input').value;
    const fullname = document.getElementById('fullname_input').value;
    const name = document.getElementById('name_input').value;
    const password = document.getElementById('password_input').value;
    const type = document.getElementById('type_input').textContent;
    const study = document.getElementById('study_input').value;

    const userData = {
        fullName: fullname,
        name: name,
        password: password,
        email: email,
        userPlaceOfStudy: study,
        type_user: type,
    };

    fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": Cookies.get('csrftoken')
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!data.status) fieldValidation.innerText = 'Пользователь с такой почтой уже существует!'
        
        return data;
    })
    .then(data => {
        if (data.status) window.location.replace('/auth/?success=Успешная регистрация!');
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}
