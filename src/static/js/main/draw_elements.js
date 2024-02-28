function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };

    const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(date);
    return formattedDate;
}

function drawMaterialTrackedUsers(material, stats = false){
    let html = 
    `
    <div class="p-2 m-2" style="border-radius: 10px; background-color: rgba(0, 0, 0, 0.100);">

        <div class="hstack d-flex justify-content-between p-2">

            <div class="hstack gap-2">
                <a href="/${material.user.name}"><img class="mt-2" src="${material.user.photo_profile}" style="width: 25px; height: 25px; border-radius: 10px;"></a>
                <a href="/${material.user.name}" style="text-decoration: none;" class="text-h5-custom text-dark mt-1">${material.user.name}</a>
                `

                if (!stats) {
                    html += '<h5 class="text-h6-custom me-1" style="color: rgba(85, 85, 85, 0.712);">опубликовал материал</h5>';
                }
                else{
                    html += `<h1 class="text-h6-custom">${formatDate(material.created_at)}</h1>`;
                }

                html += 
                `


            </div>

    `

    if (stats) {
        html +=
        `
            <div class="hstack gap-2">
                <img src="/static/image/star_blank.png" class="mb-2" style="width: 15px; height: 15px;" alt="">
                <h3 class="text-h6-custom text-dark">${material.num_marks}</h3>
            </div>
        `;
    }

    else {
        html += `<h1 class="text-h6-custom mt-2">${formatDate(material.created_at)}</h1>`;
    }


    html += 
    `
            
        </div>
        
        <hr class="m-2">

        <div class="m-2 p-2" style="border-radius: 5px; background-color: rgba(83, 83, 83, 0.085);">
            <div class="hstack gap-2" >
                <a href="/${material.user.name}/${material.name}"><img class="mt-1" src="${material.icon}" style="width: 25px; height: 25px; border-radius: 10px;"></a>
                <a href="/${material.user.name}/${material.name}" style="text-decoration: none;" class="text-h5-custom text-success">${material.name}</a>
            </div>

            <h5 class="text-h6-custom m-1 mt-2" style="word-wrap: break-word;">${material.description}</h5>

            <div class="hstack gap-2 m-1 mt-0">

                <h5 class="text-h6-custom mt-2">${material.theme}</h5>
                <a href="${material.source}" style="text-decoration: none;" class="text-h6-custom text-success">${material.source}</a>
            </div>

        </div>


    </div>
    `;
    
    return html;
}