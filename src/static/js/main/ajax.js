



function getContentTrackedUsers() {
    const content_tracked_users = document.getElementById('content_tracked_users');
    const followers_materials_text = document.getElementById('followers_materials_text');
    const not_content_tracked_users = document.getElementById('not_content_tracked_users');

    fetch(`api/getContentTrackedUsers`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status == true){

                if (data.materials.length == 0) {
                    followers_materials_text.style.display = 'none';
                    not_content_tracked_users.style.display = 'block'
                    return data;
                }

                for (const material of data.materials) {
                    let html = drawMaterialTrackedUsers(material);
                    content_tracked_users.innerHTML += html;
                }

            }
            return data;
        })
        .then(data => {
            if (data.status == false){
                console.log(data.status);
            }
            return data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function getLastPopularMaterials(){

    const populars_materials_text = document.getElementById('populars_materials_text');
    const popular_materials = document.getElementById('popular_materials');

    fetch(`api/getLastPopularMaterials`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status == true){

                if (data.materials.length == 0) {
                    populars_materials_text.style.display = 'none';
                    return data;
                }

                for (const material of data.materials) {
                    let html = drawMaterialTrackedUsers(material, true);
                    popular_materials.innerHTML += html;
                }

                console.log(data);

            }
            return data;
        })
        .then(data => {
            if (data.status == false){
                console.log(data.status);
            }
            return data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function initPage(){
    getContentTrackedUsers();
    getLastPopularMaterials();
}

initPage();