import { getProjets } from "./projets";

projets = await getProjets();

let modal = null;

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

// selection de tous les lien permettant d'ouvrir la modal + ajout d'un event permettant de l'ouvrir
document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click",openModal);
    
});