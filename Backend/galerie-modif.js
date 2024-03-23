


if (sessionStorage.getItem('sessionCookies') !== null) {
    // sessionStorage est disponible

//on affiche le cookies dans la console
console.log('Dans la condition :', sessionStorage.getItem('sessionCookies'));
    // Utilisez sessionCookies ici
    const cookies = response.headers.get('set-cookie');
    console.log('Dans la condition :', sessionStorage.getItem('sessionCookies', cookies));

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

                    
                    function transitionPopupOld() {
                        let ajout_Btn = document.querySelector(".ajout_Btn");
                        let ajout_Btn_Wrapper = document.querySelector(".ajout_Btn_Wrapper");
                    
                        ajout_Btn.addEventListener("click", function (event) {
                            event.preventDefault();
                            cacherPopup();  
                            afficherPopupNew();                
                        });
                    
                        ajout_Btn_Wrapper.addEventListener("click", function (event) {
                            event.preventDefault();
                            cacherPopup();
                            afficherPopupNew(); 
                        });
                    }

                   

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
                            if (SessionStorage.JSON.getItem("sessionCookies")) {
                                // Get the token/cookie JSON from SessionStorage.json
                                // Execute the script here
                                let workId = this.dataset.workId; // Get the work ID from the span element

                                fetch(`http://localhost:5678/api/works/${workId}`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Authorization': `Bearer ${JSON.parse(SessionStorage.JSON.getItem("sessionCookies")).token}`,
                                    }
                                })
                                    .then(response => response.json())
                                    .then(data => console.log(data))
                                    .catch(error => {
                                        console.error('Error:', error);
                                        prompt("Une erreur s'est produite lors de la suppression du travail. Veuillez réessayer.");
                                    });
                            } else {
                                console.log("Vous n'avez pas l'autorisation de supprimer ce travail.");
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
                    transitionPopupOld();
                  
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
    function displaySelectedCategory(data) {
        document.getElementsByClassName("gallery")[0].innerHTML = "";

        data.forEach(item => {
            document.getElementsByClassName("gallery")[0].innerHTML += `
                    <figure>
                        <img src="${item.imageUrl}" alt="${item.title}">
                        <figcaption>${item.title}</figcaption>
                    </figure>
                    `;
        })
    }
    // fonction copiée de filtres-travaux.js comme l'import ne marche pas

    function getWorks() {
        // URL à utiliser pour la requête GET travaux
        url = 'http://localhost:5678/api/works';

        // Options de la requête GET
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };

        // Retourner la promesse de la réponse de la requête
        return fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La requête a échoué avec le statut : ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                // Afficher les données dans la console
                return data;
            })
            .catch(error => {
                // En cas d'erreur, afficher un message d'erreur dans la console et rejeter la promesse
                console.error('Une erreur est survenue lors de la requête :', error.message);
                throw error;
            });
    }

    getWorks().then(data => {
        displaySelectedCategory(data)
    })

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

        setTimeout(() => {
            clearInterval(intervalId);
        }, 6000); // 6000 millisecondes = 6 secondes

        // Ajouter l'écouteur d'événements à chaque élément de spanTrash
        let spanTrash = document.querySelectorAll(".trash-icon-span");
        spanTrash.forEach(element => {
            element.addEventListener("click", function () {
                // Si un polling est déjà en cours, l'arrêter
                if (intervalId) {
                    clearInterval(intervalId);
                }

                // Commencer un nouveau polling
                pollWorks();
            });
        });
    }
    function logout(event) {
        // Prevent the default action of the link
        event.preventDefault();

        // Remove the token and userId from the browser's session storage
        sessionStorage.removeItem('sessionToken');
        sessionStorage.removeItem('userId');

        // Redirect to the login.html page
        window.location.href = 'login.html';
    }

    // Add event listener to logout button
    document.querySelector('.logout_btn').addEventListener('click', logout);


    initAddEventListenerPopup();
    getWorks().then(data => {
        displaySelectedCategory(data)
    });
     

} else {
    // sessionStorage n'est pas disponible
    prompt("Vous n'êtes pas connecté.");
}


