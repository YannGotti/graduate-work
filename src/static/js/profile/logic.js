
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




function fillSearchInput(value){
    const searchModal = document.getElementById('searchModal')

    const searchInput = searchModal.querySelector('.modal-content input')

    searchInput.value = `@${value} `

    console.log(searchInput)

    /*if (searchModal) {
        searchModal.addEventListener('show.bs.modal', event => {


        
        })
    }*/

}