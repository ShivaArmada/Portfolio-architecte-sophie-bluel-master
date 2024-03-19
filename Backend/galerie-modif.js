
/**
 * Cette fonction initialise les écouteurs d'événements qui concernent 
 * l'affichage de la popup. 
 */
function initAddEventListenerPopup() {
    // On écoute le click sur le bouton ".login_btn"
    let modifBtns = document.querySelectorAll(".modif");

    // Ajoutez l'écouteur d'événements à chaque bouton
    modifBtns.forEach((modifBtn) => {
        modifBtn.addEventListener("click", () => {
            // Quand on a cliqué sur le bouton de connexion, on affiche la popup
            afficherPopup();
        });
    });
}

function afficherPopup() {
    let popupBackground = document.querySelector(".popupBackground");
    if (!popupBackground) {
        popupBackground = document.createElement("div");
        popupBackground.classList.add("popupBackground");
        document.body.appendChild(popupBackground);

        let Gform = document.createElement("form");
        Gform.classList.add("Gform");
        popupBackground.appendChild(Gform);

        let closeBtn = document.createElement("span");
        closeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        closeBtn.classList.add("close-icon");
        closeBtn.addEventListener("click", cacherPopup);
        popupBackground.appendChild(closeBtn);

        let modifTitle = document.createElement("h3");
        modifTitle.textContent = "Galerie Photo";
        modifTitle.classList.add("modif-title");
        Gform.appendChild(modifTitle);

        // ici la galerie récupérer avec work

        // ici le trait before du bouton ajouter une photo

        let ajout_Btn = document.createElement("input");
        ajout_Btn.setAttribute("type", "submit");
        ajout_Btn.value = "Ajouter une photo"; 
        ajout_Btn.classList.add("ajout_Btn"); //normalement inutile
        Gform.appendChild(ajout_Btn);

        // On écoute le click sur la div "popupBackground"
        popupBackground.addEventListener("click", (event) => {
            // Si on a cliqué précisément sur la popupBackground 
            // (et pas un autre élément qui se trouve dedant)
            if (event.target === popupBackground) {
                // Alors on cache la popup
                cacherPopup()
            }
        });
    }

    // La popup est masquée par défaut (display:none), ajouter la classe "active"
    // va changer son display et la rendre visible. 
    popupBackground.classList.add("active");
}

/**
 * Cette fonction cache la popup pour se connecter. 
 */
function cacherPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    // La popup est masquée par défaut (display:none), supprimer la classe "active"
    // va rétablir cet affichage par défaut. 
    popupBackground.classList.remove("active")
}

initAddEventListenerPopup()