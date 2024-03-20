import { getWorks } from './filtres-travaux.js';

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

                // Parcourir les données et créer une div pour chaque image
                data.forEach(item => {
                    let div = document.createElement("div");
                    div.classList.add("image-container");

                    let img = document.createElement("img");
                    img.src = item.imageUrl;
                    div.appendChild(img);

                    let spanTrash = document.createElement("span");
                    spanTrash.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
                    spanTrash.classList.add("trash-icon-span");
                    div.appendChild(spanTrash);

                    galerie.appendChild(div);
                });

                // Ajouter la galerie au formulaire
                Gform.appendChild(galerie);

                // Get all elements with the class 'trash-icon-span'
                let trashIcons = document.querySelectorAll('.trash-icon-span');

                // Loop through each element
                trashIcons.forEach((spanTrash, index) => {
                    // Set the workId for each element
                    // Use the work ID from the API data
                    spanTrash.dataset.workId = data[index].id;

                    // Add event listener to span element
                    spanTrash.addEventListener("click", function () {
                        // Check if token/cookie JSON exists in SessionStorage.json
                        if (sessionStorage.getItem("sessionCookies")) {
                            // Execute the script here
                            let workId = this.dataset.workId; // Get the work ID from the span element

                            fetch(`http://localhost:5678/api/works/${workId}`, {
                                method: 'DELETE',
                            })
                                .then(response => response.json())
                                .then(data => console.log(data))
                                .catch((error) => {
                                    console.error('Error:', error);
                                    prompt("Une erreur s'est produite lors de la suppression du travail. Veuillez réessayer.");
                                });

                        } else {
                            alert("Vous n'avez pas l'autorisation de supprimer ce travail.");
                        }
                    });
                });

                // Ajouter un bouton pour ajouter une photo
                let ajout_Btn_Wrapper = document.createElement("div");
                ajout_Btn_Wrapper.classList.add("ajout_Btn_Wrapper");

                let ajout_Btn = document.createElement("input");
                ajout_Btn.setAttribute("type", "submit");
                ajout_Btn.value = "Ajouter une photo";
                ajout_Btn.classList.add("ajout_Btn"); //normalement inutile

                ajout_Btn_Wrapper.appendChild(ajout_Btn);
                Gform.appendChild(ajout_Btn_Wrapper);
            })
            .catch(error => console.error('Error:', error));

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




// afficher les travaux par rapport aux données reçues de l'api et non à l'html via innerhtml

let intervalId;

function pollWorks() {
    // Appeler getWorks() immédiatement, puis à intervalles réguliers
    getWorks().then(data => {
        displaySelectedCategory(data);
    });

    intervalId = setInterval(() => {
        getWorks().then(data => {
            displaySelectedCategory(data);
        });
    }, 5000); // 5000 millisecondes = 5 secondes
}

// Ajouter l'écouteur d'événements à chaque élément de spanTrash
spanTrash.forEach(element => {
    element.addEventListener("click", function() {
        // Si un polling est déjà en cours, l'arrêter
        if (intervalId) {
            clearInterval(intervalId);
        }

        // Commencer un nouveau polling
        pollWorks();
    });
});

initAddEventListenerPopup()
pollWorks();