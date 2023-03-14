async function ajoutListenerConnexion() {
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
        console.log((await reponse.json()).token);
    });
}

ajoutListenerConnexion();

