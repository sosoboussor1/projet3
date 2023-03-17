import { getProjets } from "./projets.js";

let modal = null;

// fonction qui prend en entrée un évenement, permettant de sélectionner les lien modal afin d'afficher la modal
const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.setAttribute('aria-hidden', false);
    target.setAttribute('aria-modal', 'true');
    modal = target;
    //modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}

// fonction qui fait l'inverse de openModal
const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    window.setTimeout(function () {
        modal.style.display = 'none';
        modal = null;
    }, 500);
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    //modal.removeEventListener('click', closeModal);
    //modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
}

// fonction permettant de ne pas quitter la modale lorsqu'on click dessus
const stopPropagation = function (e) {
    e.stopPropagation();
}

// fonction permettant de générer la deuxième fenêtre de la modale
function genererMd2 () {
    // generation de la div contenant les bouton retour et close
    const divIcones = document.createElement('div');
    divIcones.className = "divIcones";

    const md2Return = document.createElement('i');
    md2Return.className = "fa-solid";
    md2Return.classList.add("fa-arrow-left-long");
    const buttonMd2Return = document.createElement('button');
    buttonMd2Return.className = "md2-return";
    buttonMd2Return.appendChild(md2Return);

    const md2Close = document.createElement('button');
    md2Close.className = "md2-close";
    const iClose = document.createElement('i');
    iClose.className = "fa-solid";
    iClose.classList.add("fa-xmark");
    md2Close.appendChild(iClose);

    divIcones.appendChild(buttonMd2Return);
    divIcones.appendChild(md2Close);

    document.querySelector('.modal-wrapper').appendChild(divIcones);

}

// fonction permettant de générer la troisième fenêtre de la modale


//permet de sélection tous les lien qui sont censés ouvrir la modale puis ouverture de cette dernière
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener("click", openModal);
});

// ajout un listener sur la touche ESC pour pouvoir quitter la modale à l'aide du clavier
window.addEventListener('keydown', function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }
});

//import des projets pour pouvoir ensuite les afficher dans md1
const projets = await getProjets();

//affichage des éléments dans la grid de md1
for (let i = 0; i < projets.length; i++) {
    const divGrid = document.createElement("div");
    divGrid.id = projets[i].id;
    const imgDiv = document.createElement("img");
    imgDiv.src = projets[i].imageUrl;
    const editDiv = document.createElement("button");
    editDiv.innerText = "éditer";
    divGrid.appendChild(imgDiv);
    divGrid.appendChild(editDiv);
    document.querySelector(".grid-projets").appendChild(divGrid);
}

//gestion du bouton add-photo-md1
document.getElementById('add-photo-md1').addEventListener('click', function () {
    //on vide la modale
    document.querySelector('.modal-wrapper').innerHTML = " ";
    //on génére la deuxième modale
    genererMd2();
    // on add un eventlistener sur le bouton close
    document.querySelector(".md2-close").addEventListener("click", closeModal);
});

