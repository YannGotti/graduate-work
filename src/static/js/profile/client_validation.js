document.addEventListener('DOMContentLoaded', function () {
    Inputmask({ regex: ".{0,45}" }).mask('#fullname_input');

    Inputmask({ regex: ".{0,45}" }).mask('#password_input');
    Inputmask({ regex: ".{0,45}" }).mask('#repeat_password_input');
});



document.addEventListener('DOMContentLoaded', function(){
    const fullNameInput = $('#fullname_input');
    const fullNameError = $('#fullname_input_error');

    const nameInput = $('#name_input');
    const nameError = $('#name_input_error');

    const emailInput = $('#email_input');
    const emailError = $('#email_input_error');

    const registration_next_button = $('#registration_next_button');

    function updateError(element, isValid, errorMessage) {

        if (isValid) {
            $(element).text('');
        } else {
            $(element).text(errorMessage);
        }
        return isValid;
    }

    function validateFullNameAndEmailAndName() {
        const name = nameInput.val();
        const fullName = fullNameInput.val();
        const email = emailInput.val();

        const fullNameValid = updateError(fullNameError, validateFullName(fullName), 'Введите корректные имя, фамилию и отчество.');
        const nameValid = updateError(nameError, validateName(name), 'Введите корректный никнейм.');
        const emailValid = updateError(emailError, validateEmail(email), 'Введите корректный email.');

        return [fullNameValid, emailValid, nameValid];
    }
    

    function updateSubmitButton() {

        const [fullNameValid, emailValid, nameValid] = validateFullNameAndEmailAndName();

        const isValid = fullNameValid && emailValid && nameValid 
        showOrHideButtoEditInformation(isValid)
    }

    fullNameInput.on('input', function() {
        updateSubmitButton();
    });

    nameInput.on('input', function() {
        updateSubmitButton();
    });

    emailInput.on('input', function() {
        updateSubmitButton();
    });

    registration_next_button.click(function() {
        updateSubmitButton();
        return
    });

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validateFullName(fullName) {
        const regex = /^[А-Яа-яЁё\s\-']+$/;
        return regex.test(fullName);
    }

    function validateName(name) {
        const regex = /^[A-Za-z\d\s\-']{5,27}$/;
        return regex.test(name);
    }

});




function showOrHideButtoEditInformation(isValid) {

    const registrationNextButton = document.getElementById('edit_info_button');
    registrationNextButton.style.display = isValid ? 'block' : 'none';

}



document.addEventListener('DOMContentLoaded', function(){
    const matchError = '#match-error';
    const passwordField = $('#new_password_input');


    function updateErrorText(element, isValid, errorMessage) {
        if (isValid) {
            $(element).text('');
        } else {
            $(element).text(errorMessage);
        }
        return isValid;
    }
    

    function validatePass() {
        const password1 = passwordField.val()

        const passwordValid = updateErrorText(matchError, validatePassword(password1), 'Пароль должен содержать минимум 8 символов, включая буквы и цифры.');

        return passwordValid;
    }

    function updateSubmitButton() {

        const passwordValid = validatePass();

        const isValid = passwordValid;

        showOrHideEditPassword(isValid)
    }

    passwordField.on('input', function() {
        updateSubmitButton();
    });

    function validatePassword(password) {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return regex.test(password);
    }

});

function showOrHideEditPassword(isValid) {

    const registrationNextButton = document.getElementById('edit_password_button');
    registrationNextButton.style.display = isValid ? 'block' : 'none';

}