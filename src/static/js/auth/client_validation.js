

document.addEventListener('DOMContentLoaded', function () {
    Inputmask({ regex: ".{0,45}" }).mask('#fullname_input');

    Inputmask({ regex: ".{0,45}" }).mask('#password_input');
    Inputmask({ regex: ".{0,45}" }).mask('#repeat_password_input');
});



document.addEventListener('DOMContentLoaded', function(){
    const passwordFields = ['#password_input', '#repeat_password_input'];
    const errorMessages = ['#password_input_error'];
    const matchError = '#match-error';

    const fullNameInput = $('#fullname_input');
    const fullNameError = $('#fullname_input_error');

    const nameInput = $('#name_input');
    const nameError = $('#name_input_error');

    const emailInput = $('#email_input');
    const emailError = $('#email_input_error');

    const registration_next_button = $('#registration_next_button');

    function updateError(element, isValid, errorMessage) {

        console.log(isValid)
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

    function validatePasswords() {
        const password1 = $(passwordFields[0]).val();
        const password2 = $(passwordFields[1]).val();

        const passwordValid = updateError(errorMessages[0], validatePassword(password1), 'Пароль должен содержать минимум 8 символов, включая буквы и цифры.');
        const matchValid = updateError(matchError, password1 === password2, 'Пароли не совпадают.');

        return [passwordValid, matchValid];
    }

    function updateSubmitButton() {

        const [fullNameValid, emailValid, nameValid] = validateFullNameAndEmailAndName();
        const [passwordValid, matchValid] = validatePasswords();

        const isValid = fullNameValid && emailValid && nameValid && passwordValid && matchValid;

        showOrHideButtonRegister(isValid)
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

    passwordFields.forEach((field) => {
        $(field).on('input', function() {
            updateSubmitButton();
        });
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
        const regex = /^[A-Za-z\s\-']{5,27}$/;
        console.log(regex.test(name))
        return regex.test(name);
    }

    function validatePassword(password) {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return regex.test(password);
    }

});


function showOrHideButtonRegister(isValid) {
    const registrationNextButton = document.getElementById('registration_next_button');
    registrationNextButton.style.display = isValid ? 'block' : 'none';

    if (isValid){
        registrationNextButton.onclick = registerNextStep;
    }
}



  