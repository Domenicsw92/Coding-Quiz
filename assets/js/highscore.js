document.getElementById('high_scores').innerHTML=localStorage.getItem('scores')

var clearlocalBtn = document.getElementById('clearBtn')

clearlocalBtn.addEventListener('click', clearClick)

function clearClick(){
    localStorage.clear();
    location.reload();
}


