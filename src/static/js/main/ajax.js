function getContentTrackedUsers(){const c=document.getElementById("content_tracked_users"),d=document.getElementById("followers_materials_text"),a=document.getElementById("not_content_tracked_users");fetch("api/getContentTrackedUsers").then(b=>{if(!b.ok)throw Error(`Network response was not ok: ${b.status}`);return b.json()}).then(b=>{if(1==b.status){if(0==b.materials.length)return d.style.display="none",a.style.display="block",b;for(const e of b.materials){let f=drawMaterialTrackedUsers(e);c.innerHTML+=
f}}return b}).then(b=>{0==b.status&&console.log(b.status);return b}).catch(b=>{console.error("There was a problem with the fetch operation:",b)})}
function getLastPopularMaterials(){const c=document.getElementById("populars_materials_text"),d=document.getElementById("popular_materials");fetch("api/getLastPopularMaterials").then(a=>{if(!a.ok)throw Error(`Network response was not ok: ${a.status}`);return a.json()}).then(a=>{if(1==a.status){if(0==a.materials.length)return c.style.display="none",a;for(const b of a.materials){let e=drawMaterialTrackedUsers(b,!0);d.innerHTML+=e}}return a}).then(a=>{0==a.status&&console.log(a.status);return a}).catch(a=>
{console.error("There was a problem with the fetch operation:",a)})}function initPage(){getContentTrackedUsers();getLastPopularMaterials()}initPage();
