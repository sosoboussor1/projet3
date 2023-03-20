import { getProjets, genererProjets } from "./projets.js";

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
    document.querySelector(".md-all").innerHTML = "";
    document.querySelector(".md1").style.display = "flex";
}

// fonction permettant de ne pas quitter la modale lorsqu'on click dessus
const stopPropagation = function (e) {
    e.stopPropagation();
}

// fonction permettant de générer la deuxième fenêtre de la modale
function genererMd2() {
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

    document.querySelector('.md-all').appendChild(divIcones);

    // generation du titre de md2
    const titreMd2 = document.createElement('h1');
    titreMd2.className = "md2-titre";
    titreMd2.innerText = "Ajout photo";
    document.querySelector('.md-all').appendChild(titreMd2);
    // generation du formulaire de md2
    const formulaireAjout = document.createElement('form');
    formulaireAjout.method = "post";

    const divForm = document.createElement('div');
    divForm.className = "divForm";
    const iForm = document.createElement('i');
    iForm.className = "fa-regular";
    iForm.classList.add("fa-image");
    divForm.appendChild(iForm);

    const imgInput = document.createElement("input");
    imgInput.type = "file";
    imgInput.id = "imgButton";
    imgInput.name = "imgButton";
    imgInput.accept = "image/*";
    imgInput.style.display = "none";
    const labelImg = document.createElement("label");
    labelImg.setAttribute("for", "imgButton");
    labelImg.className = "labelImg";
    labelImg.innerText = "+ Ajouter photo";
    divForm.appendChild(labelImg);
    divForm.appendChild(imgInput);

    const tailleMax = document.createElement("p");
    tailleMax.className = "tailleMax";
    tailleMax.innerText = "jpg, png : 4mo max";
    divForm.appendChild(tailleMax);

    formulaireAjout.appendChild(divForm);


    const titreInputLabel = document.createElement("label");
    titreInputLabel.setAttribute("for", "titreInput");
    titreInputLabel.className = "titreInputLabel";
    titreInputLabel.innerText = "Titre";
    const categorieInputLabel = document.createElement("label");
    categorieInputLabel.setAttribute("for", "categorieInput");
    categorieInputLabel.className = "categorieInputLabel";
    categorieInputLabel.innerText = "Catégorie";
    const titreInput = document.createElement("input");
    titreInput.setAttribute("name", "titreInput");
    titreInput.setAttribute("type", "text");
    titreInput.id = "titreInput";

    formulaireAjout.appendChild(titreInputLabel);
    formulaireAjout.appendChild(titreInput);

    formulaireAjout.appendChild(categorieInputLabel);
    const categorieInput = document.createElement("select");
    categorieInput.setAttribute("name", "categorieInput");
    categorieInput.id = "categorieInput";
    const opt0 = document.createElement("option");
    const opt1 = document.createElement("option");
    const opt2 = document.createElement("option");
    const opt3 = document.createElement("option");
    opt0.innerText = " ";
    opt1.innerText = "Objets";
    opt2.innerText = "Appartements";
    opt3.innerText = "Hôtels & restaurants";
    categorieInput.appendChild(opt0);
    categorieInput.appendChild(opt1);
    categorieInput.appendChild(opt2);
    categorieInput.appendChild(opt3);

    formulaireAjout.appendChild(categorieInput);

    const md2Line = document.createElement("p");
    md2Line.className = "md2-line";
    md2Line.innerText = "p";
    formulaireAjout.appendChild(md2Line);

    const submitFormulaireMd2 = document.createElement("input");
    submitFormulaireMd2.className = "submit-form-md2";
    submitFormulaireMd2.setAttribute("value", "Valider");
    submitFormulaireMd2.setAttribute("type", "submit");
    formulaireAjout.appendChild(submitFormulaireMd2);

    document.querySelector('.md-all').appendChild(formulaireAjout);
}

// fonction permettant de générer la troisième fenêtre de la modale
function genererMd3(titreProjet, categorieProjet, imgProjet) {
    document.querySelector('.md1').style.display = "none";

    //generation bouttons return et close
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

    document.querySelector('.md-all').appendChild(divIcones);

    //ajout du titre de md3
    const titreMd3 = document.createElement("h1");
    titreMd3.innerText = "Ajout photo";
    document.querySelector('.md-all').appendChild(titreMd3);
}

//permet de sélection tous les lien qui sont censés ouvrir la modale puis ouverture de cette dernière
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener("click", openModal);
});

// ajout un listener sur la touche ESC pour pouvoir quitter la modale à l'aide du clavier
window.addEventListener('keydown', function (e) {
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
    editDiv.className = `edit-button-${i}`;
    divGrid.appendChild(imgDiv);
    divGrid.appendChild(editDiv);
    document.querySelector(".grid-projets").appendChild(divGrid);
}

//gestion du bouton add-photo-md1
document.getElementById('add-photo-md1').addEventListener('click', async function () {
    //on vide la modale
    document.querySelector('.md1').style.display = "none";
    //on génére la deuxième modale
    genererMd2();
    // on add un eventlistener sur le bouton close
    document.querySelector(".md2-close").addEventListener("click", closeModal);
    // on add un event listener sur le bouton return
    document.querySelector(".md2-return").addEventListener("click", function () {
        document.querySelector(".md-all").innerHTML = "";
        document.querySelector(".md1").style.display = "flex";
    });
    // on add un event listener sur le bouton submit
    document.querySelector(".submit-form-md2").addEventListener("click", async function (e) {
        e.preventDefault();
        //on récupère les infos puis on les stocks dans la bdd

        //on ferme la modal
        closeModal(e);
        //on vide la div avec tout les projets à jour puis on regénère la div avec la liste de projets à jour
        const projetsAJour = await getProjets();
        document.querySelector(".gallery").innerHTML = "";
        genererProjets(projetsAJour);
    });
});

// gestion des boutons editer
async function editer() {
    let gridProjets = await getProjets();
    for (let i = 0; i < gridProjets.length; i++) {
        const nomClassBouton = `.edit-button-${i}`;
        document.querySelector(nomClassBouton).addEventListener("click", function () {
            const titreP = gridProjets[i].title;
            const categorieP = gridProjets[i].categoryId;
            const imgP = gridProjets[i].imageUrl;
            genererMd3(titreP, categorieP, imgP);
            // on add un eventlistener sur le bouton close
            document.querySelector(".md2-close").addEventListener("click", closeModal);
            // on add un event listener sur le bouton return
            document.querySelector(".md2-return").addEventListener("click", function () {
                document.querySelector(".md-all").innerHTML = "";
                document.querySelector(".md1").style.display = "flex";
            });
        });
    }
}

// gestion de l'affichage de md3 en fonction du projet sélectionné
const idProjet = await editer();







