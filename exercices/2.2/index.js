const btn = document.querySelector('#mybtn');
let nbrClick = 0;

btn.addEventListener('click',incr);

function incr() {
    btn.innerText = nbrClick; 
    nbrClick++;

    if(nbrClick>4 && nbrClick <10){
    alert("Bravo, bel échauffement !")
    }

    if(nbrClick >10){
    alert("Vous êtes passé maître en l'art du clic !")
    }
}