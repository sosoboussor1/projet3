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
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
}

// fonction permettant de ne pas quitter la modale lorsqu'on click dessus
const stopPropagation = function (e) {
    e.stopPropagation();
}

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