


/**
 * Cette fonction initialise les écouteurs d'événements qui concernent 
 * l'affichage de la popup. 
 */
function initAddEventListenerPopup() {
    // On écoute le click sur le bouton ".modif"
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
        Gform.appendChild(closeBtn);

        let modifTitle = document.createElement("h3");
        modifTitle.textContent = "Galerie Photo";
        modifTitle.classList.add("modif-title");
        Gform.appendChild(modifTitle);

        // ici la galerie récupérer avec work
// URL de l'API
const url = 'http://localhost:5678/api/works';

// Récupérer les données de l'API
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Créer la galerie
        let galerie = document.createElement("span");
        galerie.classList.add("galerie");

        // Parcourir les données et créer un élément img pour chaque image
        data.forEach(item => {
            let img = document.createElement("img");
            img.src = item.imageUrl;
            galerie.appendChild(img);
        });

        // Ajouter la galerie au formulaire
        Gform.appendChild(galerie);
    })
    .catch(error => console.error('Error:', error));
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
 * Cette fonction cache la popup. 
 */
function cacherPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    // La popup est masquée par défaut (display:none), supprimer la classe "active"
    // va rétablir cet affichage par défaut. 
    popupBackground.classList.remove("active")
}

initAddEventListenerPopup()