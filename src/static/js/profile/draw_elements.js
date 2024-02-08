

function drawMarkMaterials(data){

    console.log(data)

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