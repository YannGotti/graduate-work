function showHrElement(element) {
    const hrElement = element.querySelector('hr');

    function updateHrVisibility(targetElement) {
        const targetHr = document.getElementById(targetElement.id).querySelector('hr');
        hrElement.classList.remove("hr-hide");
        hrElement.classList.add("hr-show", "animate__animated", "animate__fadeInDown");
        targetHr.classList.add("hr-hide");
        targetHr.classList.remove("hr-show", "animate__animated", "animate__fadeInDown");
    }

    function updateFormVisibility(hideElement, showElement) {

        hideElement.style.display = "none";

        showElement.style.display = "block";

    }

    const registrationButton = document.getElementById('registration_button');
    const loginButton = document.getElementById('login_button');
    const resetPasswordButton = document.getElementById('reset_password_button');

    const registrationForm = document.getElementById('registration_form');
    const loginForm = document.getElementById('login_form');
    const resetPasswordForm = document.getElementById('reset_password_form');

    const registrationNextButton = document.getElementById('registration_next_button');
    const registration_form_two_step = document.getElementById('registration_form_two_step');

    if (element === resetPasswordButton){
        updateHrVisibility(loginButton);
        updateHrVisibility(registrationButton);

        updateFormVisibility(loginForm, resetPasswordForm);
        updateFormVisibility(registrationForm, resetPasswordForm);

        registrationNextButton.style.display = "none"
        registration_form_two_step.style.display = "none"

    }


    if (element === registrationButton) {
        updateHrVisibility(loginButton);
        updateHrVisibility(resetPasswordButton);



        updateFormVisibility(loginForm, registrationForm);
        updateFormVisibility(resetPasswordForm, registrationButton);

        registrationNextButton.style.display = "block"

        registration_form_two_step.style.display = "none"
    }

    if (element === loginButton) {
        updateHrVisibility(registrationButton);
        updateHrVisibility(resetPasswordButton);


        updateFormVisibility(registrationForm, loginForm);
        updateFormVisibility(resetPasswordForm, loginForm);



        registrationNextButton.style.display = "none"


        registration_form_two_step.style.display = "none"
    }
}
