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
    const registrationForm = document.getElementById('registration_form');
    const loginForm = document.getElementById('login_form');

    const registrationNextButton = document.getElementById('registration_next_button');
    const registration_form_two_step = document.getElementById('registration_form_two_step');


    if (element === registrationButton) {
        updateHrVisibility(loginButton);
        updateFormVisibility(loginForm, registrationForm);

        registrationNextButton.style.display = "block"

        registration_form_two_step.style.display = "none"
    }

    if (element === loginButton) {
        updateHrVisibility(registrationButton);
        updateFormVisibility(registrationForm, loginForm);

        registrationNextButton.style.display = "none"


        registration_form_two_step.style.display = "none"
    }
}
