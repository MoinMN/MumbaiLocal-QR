let btn = document.getElementById('btn');
let content = document.getElementById('hide-content');
function show_hide(){
    if(content.style.display == 'none'){
        content.style.display = 'block';
        btn.innerHTML = 'Hide';
    }
    else{
        content.style.display = 'none';
        btn.innerHTML = 'Show';
    }
}