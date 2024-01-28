

function showHrElement(element) {
    const hrElement = element.querySelector('hr');

    function updateHrVisibility(targetElement) {
        const targetHr = document.getElementById(targetElement.id).querySelector('hr');
        hrElement.classList.remove("hr-hide");
        hrElement.classList.add("hr-show", "animate__animated", "animate__fadeInDown");
        targetHr.classList.add("hr-hide");
        targetHr.classList.remove("hr-show", "animate__animated", "animate__fadeInDown");
    }

    if (element.id === "login") {
        updateHrVisibility(document.getElementById('registration'));
    }

    if (element.id === "registration") {
        updateHrVisibility(document.getElementById('login'));
    }
}