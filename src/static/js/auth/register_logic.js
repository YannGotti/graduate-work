

function registerNextStep() {
    hideElement('registration_form');
    hideElement('auth_buttons');
    hideElement('registration_next_button');

    showElement('registration_form_two_step');
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