

// Cette fonction permet d'initialiser le login en appuyant sur le bouton se connecter
function initLogin() {
    let conect_Btn = document.querySelector(".conect_Btn")
    conect_Btn.addEventListener("click", () => {
        // Quand on a cliqué sur le bouton de connexion, on se connecte
        loginFunction();
    })
}


initLogin();

// Cette fonction permet de se connecter