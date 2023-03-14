// Récuperation des projets au format JSON
const reponse = await fetch('http://localhost:5678/api/works/');
const projets = await reponse.json();

// Fonction permettant de récupérer tous les projets
export async function getProjets() {
    const reponse = await fetch('http://localhost:5678/api/works/');
    const projets = await reponse.json();
    return projets;
}

// Fonction permettant d'afficher d'afficher les projets dans la div 'gallery"
export function genererProjets(projets) {
    // Boucle qui parcourt les projets
    for (let i = 0; i < projets.length; i++) {
        // on crée un élément figure qui contiendra une image + une figcaption
        const figureProjet = document.createElement("figure");
        // on crée un élément image
        const imageProjet = document.createElement("img");
        imageProjet.src = projets[i].imageUrl;
        // on crée l'élément figcaption
        const figcaptionProjet = document.createElement("figcaption");
        figcaptionProjet.innerText = projets[i].title;

        // on ajoute chaque l'image et le titre à l'élément figure
        figureProjet.appendChild(imageProjet);
        figureProjet.appendChild(figcaptionProjet);

        // on sélectionne la balise gallery puis puis on y ajoute l'élément figure
        const gallery = document.querySelector(".gallery");
        gallery.appendChild(figureProjet);
    }
}

// fonction retournant le status connecté ou non d'un user sur la page
function userConnected () {
    if (localStorage.getItem('0') != null) {
        return true;
    }
}

// fonction permettant d'afficher les éléments de modification
function afficherModif() {
    // affichage du bandeau noir et de logout à la place de login
    if (userConnected()) {
        document.getElementById('modif').style.display = 'flex';
        document.getElementById('logout').style.display = 'block';
        document.getElementById('login').style.display = 'none';
        document.getElementById('i-projet').style.display = 'block';
        document.getElementById('link-projet').style.display = 'block';
    }
}

// fonction permettant de ne plus afficher les élément de modification
function retirerModif() {
    if (userConnected() === false) {
        document.getElementById('modif').style.display = 'none';
        document.getElementById('logout').style.display = 'block';
        document.getElementById('login').style.display = 'none';
        document.getElementById('i-projet').style.display = 'none';
        document.getElementById('link-projet').style.display = 'none';
    }
}

retirerModif();
afficherModif();
genererProjets(projets);

// Boutons

// Bouton 'TOUS' 
// On sélectionne la balise du bouton
const boutonReset = document.querySelector(".f-1");

//On ajoute une eventListener sur le bouton puis on appel la fonction genererProjets sur la liste de base
boutonReset.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(projets);
});

// Filtrage par catégorie
// Objets : f-2
// On sélectionne la balise du bouton
const boutonObjets = document.querySelector(".f-2");

// on ajoute un eventListener sur le bouton puis on filtre sur la catégorie désirée les projet pour les afficher
boutonObjets.addEventListener("click", function () {
    const objets = projets.filter(projet => projet.categoryId === 1);
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(objets);
});

// Appartements : f-3
// On sélectionne la balise du bouton
const boutonApparts = document.querySelector(".f-3");

// on ajoute un eventListener sur le bouton puis on filtre sur la catégorie désirée les projet pour les afficher
boutonApparts.addEventListener("click", function () {
    const objets = projets.filter(projet => projet.categoryId === 2);
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(objets);
});

// Hotels et Restaurants : f-4
// On sélectionne la balise du bouton
const boutonHotelsRestaurants = document.querySelector(".f-4");

// on ajoute un eventListener sur le bouton puis on filtre sur la catégorie désirée les projet pour les afficher
boutonHotelsRestaurants.addEventListener("click", function () {
    const objets = projets.filter(projet => projet.categoryId === 3);
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(objets);
});

// gestion du bouton logout
const linkLogout = document.querySelector(".nav-logout");

linkLogout.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

