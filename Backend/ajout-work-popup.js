

// L'inner HTML de la popup que nous voulons afficher

let popupHTML = document.createElement("div");
popupHTML.classList.add("popupBackground");
document.body.appendChild(popupHTML);

let inputEmail = document.createElement("input");
inputEmail.setAttribute("type", "email");
let spanEmail = document.createElement("span");
spanEmail.appendChild(inputEmail);

let inputPassword = document.createElement("input");
inputPassword.setAttribute("type", "password");
let spanPassword = document.createElement("span");
spanPassword.appendChild(inputPassword);

let conect_Btn = document.createElement("button");
conect_Btn.textContent = "Ajouter";
conect_Btn.classList.add("conect_Btn");

popupHTML.appendChild(spanEmail);
popupHTML.appendChild(spanPassword);
popupHTML.appendChild(conect_Btn);

/**
 * Cette fonction affiche la popup pour se connecter. 
 */
function afficherPopup() {
    let popupBackgroundA = document.querySelector(".popupBackground")
    // La popup est masquée par défaut (display:none), ajouter la classe "active"
    // va changer son display et la rendre visible. 
    popupBackgroundA.classList.add("active")
}

/**
 * Cette fonction cache la popup pour se connecter. 
 */
function cacherPopup() {
    let popupBackgroundA = document.querySelector(".popupBackground")
    // La popup est masquée par défaut (display:none), supprimer la classe "active"
    // va rétablir cet affichage par défaut. 
    popupBackgroundA.classList.remove("active")
}


/**
 * Cette fonction initialise les écouteurs d'événements qui concernent 
 * l'affichage de la popup. 
 */
function initAddEventListenerPopup() {
    // On écoute le click sur le bouton ".login_btn"
    let loginBtn = document.querySelector(".ajout-btn")
    let popupBackgroundA = document.querySelector(".popupBackground")
    loginBtn.addEventListener("click", () => {
        // Quand on a cliqué sur le bouton de connexion, on affiche la popup
        afficherPopup()
    })

    // On écoute le click sur la div "popupBackground"
    popupBackgroundA.addEventListener("click", (event) => {
        // Si on a cliqué précisément sur la popupBackground 
        // (et pas un autre élément qui se trouve dedant)
        if (event.target === popupBackgroundA) {
            // Alors on cache la popup
            cacherPopup()
        }
    })
}



