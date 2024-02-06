

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

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function userRegistration() {
    const csrftoken = getCookie('csrftoken');
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

    $.ajax({
        url: '/auth/register/',
        method: 'post',
        data: userData,
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        success: function (data) {
            if (data === "Not") {
                fieldValidation.innerText = `Пользователь с такой почтой уже существует!`;
            } else if (data === 'Ok') {
                window.location.replace("/auth/?success=Успешная регистрация!");
            }
        },
        error: function (jqXHR, exception) {
            // Обработка ошибок, если необходимо
        }
    });
}

function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}