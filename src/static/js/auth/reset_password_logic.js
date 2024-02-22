
$(document).ready(function () {
    Inputmask({ mask: "999999" }).mask('#code_reset');
});


function sendMailResetPassword() {
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

    fetch('/auth/reset_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!data.status) {
            resetMessageErrorNotUser.style.display = "block";
            resetProgress.style.display = "none";
        }

        if (data.status) {
            resetProgress.style.display = "none";
            resetMessage.style.display = "none";
            resetMessageErrorNotUser.style.display = "none";

            resetMessageSend.style.display = "block";
            validationResetForm.style.display = "block";
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}

function verifyCodeResetPassword() {
    const resetEmailInput = document.getElementById('reset_email_input');
    const codeReset = document.getElementById('code_reset');

    const validationResetForm = document.getElementById('validation_reset_form');
    const notVerifyMessage = document.getElementById('not_verify_message');

    const resetReplacePasswordForm = document.getElementById('reset_replace_password_form');

    const data = {
        email: resetEmailInput.value,
        reset_code: codeReset.value
    };

    fetch('/auth/reset_password/verify_code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!data.status) notVerifyMessage.style.display = "block";
        
        return data
    })
    .then(data => {
        if (data.status) {
            validationResetForm.style.display = "none";
            resetReplacePasswordForm.style.display = "block";
        }

        return data
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}

function resetPassword() {
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

    fetch('/auth/reset_password/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
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
        if (!data.status) resetPasswordError.style.display = "block";

        return data;
    })
    .then(data => {
        if (data.status) {
            resetReplacePasswordForm.style.display = "none";
            resetMessage.style.display = "block";
            successPasswordReset.style.display = "block";
        }

        return data;
    })
    .catch(error => {
        console.error('Ошибка:', error);
    })
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