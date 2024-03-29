let btn = document.getElementById('btn');
let hide_content = document.getElementById('hide-content');


let railway = document.getElementsByName('railway');

for (let i = 0; i < railway.length; i++) {
    railway[i].addEventListener('input', ()=>{
        if (railway[i].value=='harbour'){
            document.getElementById('harbour').style.display = 'block';
            document.getElementById('central').style.display = 'none';
            document.getElementById('western').style.display = 'none';
        }
        if (railway[i].value=='central'){
            document.getElementById('harbour').style.display = 'none';
            document.getElementById('central').style.display = 'block';
            document.getElementById('western').style.display = 'none';
        }
        if (railway[i].value=='western'){
            document.getElementById('harbour').style.display = 'none';
            document.getElementById('central').style.display = 'none';
            document.getElementById('western').style.display = 'block';
        }
    });
}


let url = new URL(window.location.href);
url.search = '';

const result = url.toString();

if(window.location.href != result || window.location.href != "https://moinmn.github.io/MumbaiLocal-QR/"){
    window.location.href = result;
}


function show_hide(){
    if(hide_content.style.display == 'none'){
        hide_content.style.display = 'block';
        btn.innerHTML = 'Hide';
    }
    else{
        hide_content.style.display = 'none';
        btn.innerHTML = 'Show';
    }
}


const searchFun=()=>{
    let search = document.getElementById('search').value.toUpperCase();
    let count = 0

    let content = document.getElementById('content');
    let station = content.getElementsByTagName('h3');

    for(var i=0; i<station.length; i++) {
        let ss = station[i].innerHTML.toUpperCase();

        let a = ss.indexOf(search);
        let attri = station[i].getAttribute('id');
        
        if (a > -1) {
            count = 1
            window.location.href = '#'+attri;
        }
    }

    if (count == 0){
        alert("Station Name Not Found.");
    }
}

// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}



