
const listFilter = [
    "Учебник",
    "Лекция",
    "Задачник",
    "Статья",
    "Видеоурок",
    "Презентация",
    "Тест",
    "Исследование",
    "Эксперимент",
    "Курс",
    "Другое"
];



function fillFilterList(username, tab = 'main'){
    const filter_list = document.getElementById('filter_list');
    for (const filter of listFilter) {
        filter_list.innerHTML += `<li><a class="dropdown-item text-h5-custom"  style="font-weight: 700;" href="/${username}/?filter=${filter}&tab=${tab}">${filter}</a></li>`
    }

    filter_list.innerHTML += `
    <hr>
    <li><a class="dropdown-item text-h5-custom mb-2"  style="font-weight: 700;" href="/${username}/?tab=${tab}">Сброс</a></li>
    `
                
}

function parseUsernameMaterial(text) {
    const regex = /^(@\w*|)\s?(.*)$|^(\S+)\s?(.*)$/;

    const matches = text.match(regex);

    if (matches) {
        const username = (matches[1] || matches[3] || '').trim();
        const material = (matches[2] || matches[4] || '').trim();

        return { username, material };
    } else {
        return { username: '', material: '' };
    }
}




function fillSearchInput(value){
    const searchModal = document.getElementById('searchModal');

    const searchInput = searchModal.querySelector('.modal-content input');

    if (value === '')  searchInput.value = ``;
    else searchInput.value = `@${value} `;

    getSearchMaterial();

    searchInput.removeEventListener('input', getSearchMaterial);

    searchInput.addEventListener('input', getSearchMaterial);
}