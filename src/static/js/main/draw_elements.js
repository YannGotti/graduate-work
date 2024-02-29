function formatDate(a){a=new Date(a);return(new Intl.DateTimeFormat("ru-RU",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"})).format(a)}function drawMaterialTrackedUsers(a,c=!1){let b=`
    <div class="p-2 m-2" style="border-radius: 10px; background-color: rgba(0, 0, 0, 0.100);">

        <div class="hstack d-flex justify-content-between p-2">

            <div class="hstack gap-2">
                <a href="/${a.user.name}"><img class="mt-2" src="${a.user.photo_profile}" style="object-fit: cover; width: 25px; height: 25px; border-radius: 10px;"></a>
                <a href="/${a.user.name}" style="text-decoration: none;" class="text-h5-custom text-dark mt-1">${a.user.name}</a>
                `;b=c?b+`<h1 class="text-h6-custom">${formatDate(a.created_at)}</h1>`:b+'<h5 class="text-h6-custom me-1" style="color: rgb(71, 71, 71);">\u043e\u043f\u0443\u0431\u043b\u0438\u043a\u043e\u0432\u0430\u043b \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b</h5>';b+="\n\n\n            </div>\n\n    ";b=c?b+`
            <div class="hstack gap-2">
                <img src="/static/image/star_blank.png" class="mb-2" style="width: 15px; height: 15px;" alt="">
                <h3 class="text-h6-custom text-dark">${a.num_marks}</h3>
            </div>
        `:b+`<h1 class="text-h6-custom mt-2">${formatDate(a.created_at)}</h1>`;return b+=`
            
        </div>
        
        <hr class="m-2">

        <div class="m-2 p-2" style="border-radius: 5px; background-color: rgba(83, 83, 83, 0.085);">
            <div class="hstack gap-2" >
                <a href="/${a.user.name}/${a.name}"><img class="mt-1" src="${a.icon}" style="object-fit: cover; width: 25px; height: 25px; border-radius: 10px;"></a>
                <a href="/${a.user.name}/${a.name}" style="text-decoration: none;" class="text-h5-custom text-success">${a.name}</a>
            </div>

            <h5 class="text-h6-custom m-1 mt-2" style="word-wrap: break-word;">${a.description}</h5>

            <div class="hstack gap-2 m-1 mt-0">

                <h5 class="text-h6-custom mt-2">${a.theme}</h5>
                <a href="${a.source}" style="text-decoration: none;" class="text-h6-custom text-success">${a.source}</a>
            </div>

        </div>


    </div>
    `};
