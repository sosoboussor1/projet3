let modal = null;


// Récuperation des projets au format JSON
let reponse = await fetch('http://localhost:5678/api/works/');
let projets = await reponse.json();

let ibutton = [];
ibutton.length = projets.length;

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
    document.querySelector(".grid-md1").innerHTML = "";
    genererGridMd1(projets);
}

// Fonction permettant de fermer la modale
const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    document.querySelector(".md1").style.display = "flex";
    document.querySelector(".md2").style.display = "none";
    document.querySelector(".modal-wrapper").style.height = "730px";
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", 'true');
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    removeListenerSupr(projets);
    modal = null;
}

// Fonction permettant de délimiter la zone de fermeture de la modale
const stopPropagation = function (e) {
    e.stopPropagation();
}

// Fonction permettant de générer la grid de la fenêtre md1 de la modale
function genererGridMd1(projets) {
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
        editDiv.setAttribute("href", "#");
        editDiv.id = `${projets[i].id}`;
        editDiv.className = "edit-div"
        editDiv.innerText = "éditer";

        divGrid.appendChild(divGridButtonDelete);
        divGrid.appendChild(editDiv);
        document.querySelector(".grid-md1").appendChild(divGrid);
    }
    addListenerSupr(projets);
}

// fonction permettant d'ajouter des listener sur les boutons supprimer
function addListenerSupr(projets) {
    for (let i = 0; i < projets.length; i++) {
        const idButton = `grid-button-delete-${i}`;
        document.getElementById(idButton).addEventListener("click", function (e) {
            e.preventDefault();
            console.log(i);
            ibutton[i] = i;
            console.log(ibutton);
        })
    }
}

// fonction permettant de retirer les listener sur les boutons supprimer
function removeListenerSupr(projets) {
    for (let i = 0; i < projets.length; i++) {
        const idButton = `grid-button-delete-${i}`;
        document.getElementById(idButton).removeEventListener("click", function (e) {
            e.preventDefault();
            console.log(i);
        })
    }
}

// selection de tous les lien permettant d'ouvrir la modal + ajout d'un event permettant de l'ouvrir
document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal);
});

// PreventDefault sur le lien supprimer tous les projets
document.querySelector(".delete-all-md1").addEventListener("click", function (e) {
    e.preventDefault();
});

// gestion du bouton d'ajout de photo + affichage de md2
document.querySelector(".add-md1").addEventListener("click", function () {
    document.querySelector(".grid-md1").innerHTML = "";
    document.querySelector(".md1").style.display = "none";
    document.querySelector(".md2").style.display = "flex";
    document.querySelector(".modal-wrapper").style.height = "670px";
    // action du bouton fermer
    document.querySelector(".close-md2").addEventListener("click", function (e) {
        genererGridMd1(projets);
        document.querySelector(".md1").style.display = "flex";
        document.querySelector(".md2").style.display = "none";
        document.querySelector(".modal-wrapper").style.height = "730px";
        closeModal(e);
    });
    // action du bouton retour
    document.querySelector(".return-md2").addEventListener("click", function (e) {
        document.querySelector(".grid-md1").innerHTML = "";
        genererGridMd1(projets);
        document.querySelector(".modal-wrapper").style.height = "730px";
        document.querySelector(".md1").style.display = "flex";
        document.querySelector(".md2").style.display = "none";
    });

});

// gestion du submit md2
document.querySelector(".submit-md2").addEventListener("click", function (e) {
    e.preventDefault();
});

//gestion du bouton 'publier les changements'
document.querySelector(".publier-changements").addEventListener("click", async function (e) {
    // on créé un array qui contiendra l'id de tous les projets à supprimer
    let tabASuppr = [];
    for (let i = 0; i < projets.length; i++) {
        for (let j = 0; j < ibutton.length; j++) {
            if (projets[i].id === ibutton[j]) {
                tabASuppr.push(projets[i].id);
            }
        }
    }
    console.log(tabASuppr);
    //suppression avec un fetch des projets à supprimer
    if (tabASuppr != null) {
        //tabASuppr.forEach(async i => {
        // requête DELETE vers l'api
        //   const url = `http://localhost:5678/api/works/${i}`;
        //  const reponse = await fetch(url,{
        //      method: 'delete',
        //      accept: '*/*',
        //      Authorization: 'Bearer ' + window.localStorage.getItem('0')
        //   });
        //  })
    }
    // création d'un array avec les projets à ajouter
    // ajout avec un fetch des projets à ajouter
    // création d'un array avec les projets à modifier
    // modif avec un fetch des projets à modifier
})




