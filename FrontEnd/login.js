async function ajoutListenerConnexion() {
    localStorage.clear();
    const formulaireConnexion = document.querySelector(".form-login");
    formulaireConnexion.addEventListener("submit", async function (e) {
        e.preventDefault();
        // création de la variable contenant le mail et le pass de l'utilisateur
        const user = {
            email: e.target.querySelector("[name=email").value,
            password: e.target.querySelector("[name=password").value
        };

        const chargeUtile = JSON.stringify(user);
        // appel de la fonction fetch
        const reponse = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        });
        // on stock le token contenu dans la reponse à notre requête http
        const token = (await reponse.json()).token;
        // on ajoute le token au local storage
        localStorage.setItem('0', token);
        // on redirige vers la page index.html si la requête retourne bien un token
        if (reponse.status === 200) {
            window.location.replace("index.html");
        } else {
            afficherErreur();
        }
    });
}

ajoutListenerConnexion();

// fonction permettant d'afficher un message d'erreur
function afficherErreur() {
    document.getElementById('red-error').style.display = 'block';
}
