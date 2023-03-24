let modal = null;

// Récuperation des projets au format JSON
let reponse = await fetch('http://localhost:5678/api/works/');
let projets = await reponse.json();

// Fonction permettant d'ouvrir la modale
const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = null;
    target.setAttribute("aria-hidden", 'false');
    target.setAttribute("aria-modal", 'true');
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
}

// Fonction permettant de fermer la modale
const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", 'true');
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal = null;
}

// Fonction permettant de délimiter la zone de fermeture de la modale
const stopPropagation = function (e) {
    e.stopPropagation();
}

// Fonction permettant de générer la grid de la fenêtre md1 de la modale
function genererGridMd1 (projets) {
    for (let i = 0; i < projets.length; i++) {
        // div globale
        const divGrid = document.createElement("div");
        divGrid.id = `div-grid-${i}`;
        divGrid.classList.add("div-grid");

        // div avec le bouton delete
        const divGridButtonDelete = document.createElement("div");
        divGridButtonDelete.className = "div-grid-button-delete";
        divGridButtonDelete.style.backgroundImage = `url(${projets[i].imageUrl})`;

        const gridButtonDelete = document.createElement("button");
        gridButtonDelete.id = `grid-button-delete-${i}`;
        gridButtonDelete.className = "grid-button-delete";

        const iButtonDelete = document.createElement("i");
        iButtonDelete.className = "fa-solid";
        iButtonDelete.classList.add("fa-trash-can");

        gridButtonDelete.appendChild(iButtonDelete);
        divGridButtonDelete.appendChild(gridButtonDelete);

        const editDiv = document.createElement("a");
        editDiv.id = `${i}`;
        editDiv.innerText = "éditer"; 

        divGrid.appendChild(divGridButtonDelete);
        divGrid.appendChild(editDiv);
        document.querySelector(".grid-md1").appendChild(divGrid);
    }
}

genererGridMd1(projets);

// selection de tous les lien permettant d'ouvrir la modal + ajout d'un event permettant de l'ouvrir
document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click",openModal);
});

// PreventDefault sur le lien supprimer tous les projets
document.querySelector(".delete-all-md1").addEventListener("click", function (e) {
    e.preventDefault();
});