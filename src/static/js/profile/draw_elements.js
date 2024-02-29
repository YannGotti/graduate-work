function drawMarkMaterials(c){for(const a of c){if(a.is_tracked)try{document.getElementById("del_form_"+a.material_id).style.setProperty("display","block","important")}catch(b){}else try{document.getElementById("create_form_"+a.material_id).style.setProperty("display","block","important")}catch(b){}try{document.getElementById("count_mark_"+a.material_id).innerText=a.count_mark}catch(b){}}}
function drawSearchMaterials(c){const a=document.getElementById("title_materials_search"),b=document.getElementById("searched_list_materials");if(0==c.length)a.style.display="none",b.innerHTML="";else{a.style.display="block";b.innerHTML="";for(const d of c)b.innerHTML+=`
        <a href="/${d.username}/${d.name}/" class="d-flex justify-content-between search-material  p-1" style="text-decoration: none;">
            <div class="hstack gap-2" >
                <img src="/media/${d.icon}" style="width: 25px; height: 25px; border-radius: 100%;" alt="">
                <h6 class="text-h6-custom text-dark mt-1" style="text-decoration: none;">${d.name}</h6>
            </div>

            <h6 class="text-h6-custom text-dark m-2">@${d.username}</h6>
        </a>
        `}}function drawSearchUsers(c){const a=document.getElementById("title_users_search"),b=document.getElementById("searched_list_users");if(0==c.length)a.style.display="none",b.innerHTML="";else{a.style.display="block";b.innerHTML="";for(const d of c)b.innerHTML+=`
        <a href="/${d.name}/" class="d-flex justify-content-between search-material  p-1" style="text-decoration: none;">
            <div class="hstack gap-2" >
                <img src="/media/${d.photo_profile}" style="width: 25px; height: 25px; border-radius: 100%;" alt="">
                <h6 class="text-h6-custom text-dark mt-1" style="text-decoration: none;">${d.name}</h6>
            </div>

            <h6 class="text-h6-custom text-dark m-2">\u041f\u0435\u0440\u0435\u0439\u0442\u0438</h6>
        </a>
        `}}function drawSearchMaterialsUsers(c,a){drawSearchMaterials(c);drawSearchUsers(a)};
