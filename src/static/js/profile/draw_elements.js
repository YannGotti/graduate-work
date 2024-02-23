

function drawMarkMaterials(data){

    for (const mark of data) {
        if (mark.is_tracked)
        {

            try {
                const del_form = document.getElementById('del_form_' + mark.material_id);
                del_form.style.setProperty('display', 'block', 'important');
            } catch (error) {
                
            }
            
        }
        else
        {

            try {
                const create_form = document.getElementById('create_form_' + mark.material_id);
                create_form.style.setProperty('display', 'block', 'important');
            } catch (error) {
                
            }
            
        }

        try {
            const count_mark = document.getElementById('count_mark_' + mark.material_id);
            count_mark.innerText = mark.count_mark;
        } catch (error) {
            
        }

        
    }

}

function drawSearchMaterials(materials){
    const title_materials_search = document.getElementById('title_materials_search');
    const searched_list_materials = document.getElementById('searched_list_materials');

    if (materials.length == 0){
        title_materials_search.style.display = 'none';
        searched_list_materials.innerHTML = ``;
        return;
    } 

    title_materials_search.style.display = 'block';

    searched_list_materials.innerHTML = ``;

    for (const material of materials) {
        searched_list_materials.innerHTML +=
        `
        <a href="/${material.username}/${material.name}/" class="d-flex justify-content-between search-material  p-1" style="text-decoration: none;">
            <div class="hstack gap-2" >
                <img src="/media/${material.icon}" style="width: 25px; height: 25px; border-radius: 100%;" alt="">
                <h6 class="text-h6-custom text-dark mt-1" style="text-decoration: none;">${material.name}</h6>
            </div>

            <h6 class="text-h6-custom text-dark m-2">Перейти</h6>
        </a>
        `
    }
}

function drawSearchUsers(users){
    const title_materials_search = document.getElementById('title_users_search');
    const searched_list_materials = document.getElementById('searched_list_users');

    if (users.length == 0){
        title_materials_search.style.display = 'none';
        searched_list_materials.innerHTML = ``;
        return;
    } 

    title_materials_search.style.display = 'block';

    searched_list_materials.innerHTML = ``;

    for (const user of users) {
        searched_list_materials.innerHTML +=
        `
        <a href="/${user.name}/" class="d-flex justify-content-between search-material  p-1" style="text-decoration: none;">
            <div class="hstack gap-2" >
                <img src="/media/${user.photo_profile}" style="width: 25px; height: 25px; border-radius: 100%;" alt="">
                <h6 class="text-h6-custom text-dark mt-1" style="text-decoration: none;">${user.name}</h6>
            </div>

            <h6 class="text-h6-custom text-dark m-2">Перейти</h6>
        </a>
        `
    }
}

function drawSearchMaterialsUsers(materials, users){
    drawSearchMaterials(materials);
    drawSearchUsers(users);
}