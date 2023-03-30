let modal = null;
import { genererProjets, getProjets } from "./projets.js";

// Récuperation des projets au format JSON
let reponse = await fetch('http://localhost:5678/api/works/');
let projets = await reponse.json();

let ibutton = [];
ibutton.length = projets.length;

// Fonction permettant d'ouvrir la modale
const openModal = async function (e) {
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
    const p = await getProjets();
    await genererGridMd1(p);
}

// Fonction permettant de fermer la modale
const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    document.querySelector(".md1").style.display = "flex";
    document.querySelector(".md2").style.display = "none";
    document.querySelector(".ajout-img-md2").style.backgroundImage = "none";
    document.getElementById("img-md2").value = "";
    document.querySelector(".icone-img").style.opacity = 1;
    document.querySelector(".label-img-md2").style.opacity = 1;
    document.querySelector(".info-img-md2").style.opacity = 1;
    document.querySelector(".modal-wrapper").style.height = "730px";
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

const addProjet = async function (e) {
    e.preventDefault();
    // recupération des éléments de formulaire
    let imgInput = document.getElementById("img-md2");
    let titleInput = document.getElementById("title-md2");
    let categoryInput = document.getElementById("category-md2");
    // on détermine l'id de category
    let categoryNumber;
    if (categoryInput.value == "Objets") {
        categoryNumber = 1;
    } else if (categoryInput.value == "Appartements") {
        categoryNumber = 2;
    } else {
        categoryNumber = 3;
    }
    console.log(imgInput.value + " " + titleInput.value + " " + categoryNumber);
    if (imgInput.value.length != 0 && titleInput.value != null && categoryInput.value != null) {
        //window.alert("Tous les champs n'ont pas été remplis !")
        //on calcule la taille de l'image téléchargée
        const fsize = imgInput.files[0].size;
        const file = Math.round((fsize / 1024));
        console.log(imgInput.files[0]);
        // on continue le fetch si la taille du fichier est respectée
        if (file < 4096) {
            // on fait un fetch en fonction de l'extension du fichier
            const extension = imgInput.value.split('.').pop();
            if (extension == "jpg" || extension == "jpeg") {
                // on créé un objet contenant les infos du nouveau projet
                const body = new FormData;
                body.append("image", imgInput.files[0]);
                body.append("title", titleInput.value);
                body.append("category", categoryNumber);
                console.log(body);
                //console.log(body.get("title"));
                //console.log(body.get("image"));
                // on fait un fetch POST vers l'API
                const jwt = window.localStorage.getItem("0");
                const reponse = await fetch("http://localhost:5678/api/works", {
                    body: body,
                    headers: {
                        Authorization: "Bearer " + jwt
                    },
                    method: "POST"
                });
                console.log(reponse.status);
            } else if (extension == "png") {
                // on créé un objet contenant les infos du nouveau projet
                const body = new FormData;
                body.append("image", imgInput.value + ";" + "type=image/png");
                body.append("title", titleInput.value);
                body.append("category", categoryNumber);
                console.log(body);
                //console.log(body.get("title"));
                //console.log(body.get("image"));
                // on fait un fetch POST vers l'API
                const jwt = window.localStorage.getItem("0");
                const reponse = await fetch("http://localhost:5678/api/works", {
                    body: body,
                    headers: {
                        Authorization: "Bearer " + jwt
                    },
                    method: "POST"
                });
                console.log(reponse.status);
            } else {
                window.alert("Le fichier n'a pas la bonne extension");
            }
            console.log("fichier validé");
        } else {
            window.alert("La taille de l'image dépasse 4mo")
        }

        // on vide les champs si jamais l'utilisateur souhaite refaire un envoie de formulaire
        document.getElementById("img-md2").value = "";
        document.getElementById("title-md2").value = "";
        document.getElementById("category-md2").value = "";
        const projetsAJour = await getProjets();
        document.querySelector(".gallery").innerHTML = "";
        genererProjets(projetsAJour);
        document.querySelector(".grid-md1").innerHTML = "";
        closeModal(e);
    } else {
        window.alert("Tous les champs n'ont pas été remplis !");
    }
}

// Fonction permettant de générer la grid de la fenêtre md1 de la modale
async function genererGridMd1(projets) {

    for (let i = 0; i < projets.length; i++) {
        // div globale
        const divGrid = document.createElement("div");
        divGrid.id = `div-grid-${projets[i].id}`;
        divGrid.classList.add("div-grid");

        // div avec le bouton delete
        const divGridButtonDelete = document.createElement("div");
        divGridButtonDelete.className = "div-grid-button-delete";
        divGridButtonDelete.style.backgroundImage = `url(${projets[i].imageUrl})`;

        const gridButtonDelete = document.createElement("button");
        gridButtonDelete.id = `grid-button-delete-${projets[i].id}`;
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
    await addListenerSupr(projets);
}

// fonction permettant d'ajouter des listener sur les boutons supprimer
async function addListenerSupr(projets) {
    for (let i = 0; i < projets.length; i++) {
        const idButton = `grid-button-delete-${projets[i].id}`;
        document.getElementById(idButton).addEventListener("click", async function (e) {
            e.preventDefault();
            const jwt = window.localStorage.getItem("0");
            const url = `http://localhost:5678/api/works/${projets[i].id}`;
            const reponse = await fetch(url, {
                headers: {
                    Accept: "*/*",
                    Authorization: "Bearer " + jwt
                },
                method: "DELETE"
            })
            if (reponse.status == 204) {
                projets.splice(i, 1);
                document.querySelector(".grid-md1").innerHTML = "";
                await genererGridMd1(projets);
                document.querySelector(".gallery").innerHTML = "";
                genererProjets(projets);
            }
        })
    }
}


// fonction permettant de retirer les listener sur les boutons supprimer
/*function removeListenerSupr(projets) {
    for (let i = 0; i < projets.length; i++) {
        const idButton = `grid-button-delete-${i}`;
        document.getElementById(idButton).removeEventListener("click", function (e) {
            e.preventDefault();
            console.log(i);
        })
    }
}*/

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
    // affichage de la preview
    document.getElementById("img-md2").addEventListener("change", function (e) {
        document.querySelector(".ajout-img-md2").style.backgroundImage = `url(${URL.createObjectURL(e.target.files[0])})`;
        document.querySelector(".icone-img").style.opacity = 0;
        document.querySelector(".label-img-md2").style.opacity = 0;
        document.querySelector(".info-img-md2").style.opacity = 0;
    });
    // action du bouton fermer
    document.querySelector(".close-md2").addEventListener("click", async function (e) {
        await genererGridMd1(projets);
        document.querySelector(".md1").style.display = "flex";
        document.querySelector(".md2").style.display = "none";
        document.querySelector(".modal-wrapper").style.height = "730px";
        closeModal(e);
    });
    // action du bouton retour
    document.querySelector(".return-md2").addEventListener("click", async function (e) {
        document.querySelector(".grid-md1").innerHTML = "";
        await genererGridMd1(projets);
        document.querySelector(".modal-wrapper").style.height = "730px";
        document.querySelector(".md1").style.display = "flex";
        document.querySelector(".md2").style.display = "none";
    });
    //action du bouton ajouter photo
    document.querySelector(".form-md2").addEventListener("submit", addProjet);
});

// gestion du submit md2
//document.querySelector(".submit-md2").addEventListener("click", function (e) {
//    e.preventDefault();
//});





