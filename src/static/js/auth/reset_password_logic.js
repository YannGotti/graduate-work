
$(document).ready(function () {
    Inputmask({ mask: "999999" }).mask('#code_reset');
});


function sendMailResetPassword(){
    const csrftoken = getCookie('csrftoken');

    const resetEmailInput = document.getElementById('reset_email_input');
    const resetMessage = document.getElementById('reset_message');
    const resetMessageSend = document.getElementById('reset_message_send');
    const validationResetForm = document.getElementById('validation_reset_form');
    const resetMessageErrorNotUser = document.getElementById('reset_message_error_not_user');
    const resetProgress = document.getElementById('reset_progress');
    resetProgress.style.display = "block";

    const data = {
        email: resetEmailInput.value
    };

    $.ajax({
        url: '/auth/reset_password/',
        method: 'post',
        data: data,
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        success: function (data) {
            if (data.status == "error"){
                resetMessageErrorNotUser.style.display = "block";
                resetProgress.style.display = "none";
            }

            if (data.status == "success") {
                resetProgress.style.display = "none";
                resetMessage.style.display = "none";
                resetMessageErrorNotUser.style.display = "none";

                resetMessageSend.style.display = "block";
                validationResetForm.style.display = "block";
            }

        },
        error: function (jqXHR, exception) {
        }
    });
}


function verifyCodeResetPassword(){
    const csrftoken = getCookie('csrftoken');

    const resetEmailInput = document.getElementById('reset_email_input');
    const codeReset = document.getElementById('code_reset');
    
    const validationResetForm = document.getElementById('validation_reset_form');
    const notVerifyMessage = document.getElementById('not_verify_message');
    
    const resetReplacePasswordForm = document.getElementById('reset_replace_password_form');

    const data = {
        email: resetEmailInput.value,
        reset_code: codeReset.value
    };

    $.ajax({
        url: '/auth/reset_password/verify_code/',
        method: 'post',
        data: data,
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        success: function (data) {
            if (data.status == "error"){
                notVerifyMessage.style.display = "block";
            }

            if (data.status == "not_verify"){
                notVerifyMessage.style.display = "block";
            }

            if (data.status == "success") {
                validationResetForm.style.display = "none";
                resetReplacePasswordForm.style.display = "block";
            }
        },
        error: function (jqXHR, exception) {
        }
    });
}

function resetPassword(){
    const csrftoken = getCookie('csrftoken');

    const email = document.getElementById('reset_email_input').value;
    const password = document.getElementById('reset_password_input').value;


    const resetPasswordError = document.getElementById('reset_password_error');
    const successPasswordReset = document.getElementById('success_password_reset');

    const resetReplacePasswordForm = document.getElementById('reset_replace_password_form');
    const resetMessage = document.getElementById('reset_message');



    const userData = {
        password: password,
        email: email,
    };

    $.ajax({
        url: '/auth/reset_password/reset/',
        method: 'post',
        data: userData,
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        success: function (data) {
            if (data.status == "error"){
                resetPasswordError.style.display = "block";
            }

            if (data.status == "success") {
                resetReplacePasswordForm.style.display = "none";

                resetMessage.style.display = "block";
                successPasswordReset.style.display = "block";
            }
        },
        error: function (jqXHR, exception) {
            // Обработка ошибок, если необходимо
        }
    });
}

document.addEventListener('DOMContentLoaded', function(){
    const passwordFields = ['#reset_password_input', '#reset_repeat_password_input'];
    const errorMessages = ['#reset_password_input_error'];
    const matchError = '#reset_match-error';

    function updateError(element, isValid, errorMessage) {
        if (isValid) {
            $(element).text('');
        } else {
            $(element).text(errorMessage);
        }
        return isValid;
    }

    function validatePasswords() {
        const password1 = $(passwordFields[0]).val();
        const password2 = $(passwordFields[1]).val();

        const passwordValid = updateError(errorMessages[0], validatePassword(password1), 'Пароль должен содержать минимум 8 символов, включая буквы и цифры.');
        const matchValid = updateError(matchError, password1 === password2, 'Пароли не совпадают.');

        return [passwordValid, matchValid];
    }

    function updateSubmitButton() {
        const [passwordValid, matchValid] = validatePasswords();

        const isValid = passwordValid && matchValid;
        console.log(isValid)

        showOrHideButtonResetRegister(isValid)
    }

    passwordFields.forEach((field) => {
        $(field).on('input', function() {
            updateSubmitButton();
        });
    });

    function validatePassword(password) {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return regex.test(password);
    }

});

function showOrHideButtonResetRegister(isValid){
    const replaceResetPasswordButton = document.getElementById('replace_reset_password_button');
    replaceResetPasswordButton.style.display = isValid ? 'block' : 'none';
}