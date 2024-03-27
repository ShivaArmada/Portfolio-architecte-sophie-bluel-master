

function transitionPopup() {
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

function afficherPopupNew() {
    let popupBackgroundNew = document.querySelector(".popupBackgroundNew");
    if (!popupBackgroundNew) {
        popupBackgroundNew = document.createElement("div");
        popupBackgroundNew.classList.add("popupBackgroundNew");
        document.body.appendChild(popupBackgroundNew);

        let GformNew = document.createElement("form");
        GformNew.classList.add("GformNew");
        popupBackgroundNew.appendChild(GformNew);

        let closeBtnNew = document.createElement("span");
        closeBtnNew.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        closeBtnNew.classList.add("close-icon");
        closeBtnNew.addEventListener("click", cacherPopupNew);
        GformNew.appendChild(closeBtnNew);


        let returnBtn = document.createElement("span");
        returnBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
        returnBtn.classList.add("return-icon");
        returnBtn.addEventListener("click", function () {
            cacherPopupNew();
            afficherPopup();
        });
        GformNew.appendChild(returnBtn);

        let modifTitleNew = document.createElement("h3");
        modifTitleNew.textContent = "Ajout Photo";
        modifTitleNew.classList.add("modif-title");
        GformNew.appendChild(modifTitleNew);

        let cadreDivNew = document.createElement("div");
        cadreDivNew.classList.add("cadre-div");

        let inputFileNew = document.createElement("input");
        inputFileNew.setAttribute("type", "file");
        inputFileNew.setAttribute("id", "images_du_bien");
        inputFileNew.setAttribute("accept", "image/png, image/jpeg");
        inputFileNew.setAttribute("max-size", "4MB");
        inputFileNew.classList.add("input-file");
        inputFileNew.style.display = "none"; // Cacher l'input
        inputFileNew.required = true; // Rendre l'input obligatoire
        cadreDivNew.appendChild(inputFileNew);

        // Ajouter un écouteur d'événements pour déclencher le clic sur l'input lorsque la div est cliquée
        cadreDivNew.addEventListener("click", function () {
            inputFileNew.click();
        });

        GformNew.appendChild(cadreDivNew);

        let imageUrl = ''; 
        let imageFile = null; 
        let imageElement = ''; // Déclarez imageElement ici pour l'utiliser plus tard
        let imgInput = null; 


        function updateVisualisation() {
            const preview_square = document.getElementsByClassName("cadre-div")[0];
            const imgInput = document.getElementById("images_du_bien");

            if (imgInput.files && imgInput.files[0]) {
                imageFile = imgInput.files[0]; // Assignez le fichier à imageFile



                const reader = new FileReader();

                reader.onload = function (e) {
                    imageUrl = e.target.result;
                    const imageElement = `<img src="${imageUrl}" loading="lazy" class="imageElement" decoding="async" style="max-width:210px; max-height:170px;">`;
                    

                    preview_square.innerHTML = imageElement;
                    
             

                };

                // Lire le fichier en tant que données URL
                reader.readAsDataURL(imageFile);

            } else {
                const imageElement = `<i class="fa-regular fa-circle-xmark"></i> style="font-size: 2rem; color: black;"`;

                preview_square.innerHTML = imageElement;
            }
        }
       

        // Ajouter un écouteur d'événements à l'input pour appeler updateVisualisation lorsque l'utilisateur sélectionne un fichier
        const inputFile = document.getElementsByClassName("input-file")[0];
        inputFile.addEventListener("change", updateVisualisation);

        let spanLogoNew = document.createElement("span");
        spanLogoNew.innerHTML = `<i class="fa-solid fa-image"></i>`;
        cadreDivNew.appendChild(spanLogoNew);

        let pAddPhotoNew = document.createElement("p");
        pAddPhotoNew.innerText = "+ Ajouter photo";
        pAddPhotoNew.classList.add("p-add-photo");
        cadreDivNew.appendChild(pAddPhotoNew);

        let pFormatNew = document.createElement("p");
        pFormatNew.innerText = "jpg, png : 4mo max";
        pFormatNew.classList.add("p-format");
        cadreDivNew.appendChild(pFormatNew);

        let divInputZone1 = document.createElement("div");
        divInputZone1.classList.add("input-zone");

        let inputTitleNew = document.createElement("input");
        inputTitleNew.setAttribute("type", "text");
        inputTitleNew.setAttribute("id", "title-zone-ajout"); // Utilisez "title-zone-ajout" comme ID pour éviter toute confrontation
        inputTitleNew.classList.add("input-reaction");
        divInputZone1.appendChild(inputTitleNew);

        let labelTitleNew = document.createElement("label");
        labelTitleNew.setAttribute("for", "title-zone-ajout");
        labelTitleNew.textContent = "Titre" // Assurez-vous que l'attribut for correspond au nouvel ID de l'élément d'entrée
        divInputZone1.insertBefore(labelTitleNew, inputTitleNew);

        GformNew.appendChild(divInputZone1);

        let divInputZone2 = document.createElement("div");
        divInputZone2.classList.add("input-zone");

        let selectCategoryNew = document.createElement("select");
        selectCategoryNew.setAttribute("name", "category");
        selectCategoryNew.setAttribute("id", "category");
        selectCategoryNew.classList.add("input-reaction");
        divInputZone2.appendChild(selectCategoryNew);

        let defaultOption = document.createElement("option");
        defaultOption.textContent = ""; // Texte de l'option par défaut
        defaultOption.setAttribute("disabled", ""); // Désactive l'option par défaut
        defaultOption.setAttribute("selected", ""); // Sélectionne l'option par défaut
        selectCategoryNew.appendChild(defaultOption); // Ajoute l'option par défaut au select

        let labelCategoryNew = document.createElement("label");
        labelCategoryNew.setAttribute("for", "category");
        labelCategoryNew.textContent = "Categorie";
        divInputZone2.insertBefore(labelCategoryNew, selectCategoryNew);

        GformNew.appendChild(divInputZone2);

        // Fetch categories from the API
        fetch('http://localhost:5678/api/categories', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('La requête a échoué avec le statut : ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                // Create an option for each category
                data.forEach(item => {
                    let optionNew = document.createElement("option");
                    optionNew.text = item.name;
                    optionNew.value = item.id;
                    selectCategoryNew.add(optionNew);
                });

                divInputZone2.appendChild(selectCategoryNew);
            })
            .catch(error => {
                console.error('Une erreur est survenue lors de la requête :', error.message);
                throw error;
            });

        let submitBtnNewWrapper = document.createElement("div");
        submitBtnNewWrapper.classList.add("sub_Wrapper");

        let submitBtnNew = document.createElement("input");
        submitBtnNew.setAttribute("type", "submit");
        submitBtnNew.value = "Valider";
        submitBtnNew.classList.add("submit-btn-new");
        GformNew.appendChild(submitBtnNew);

        submitBtnNewWrapper.appendChild(submitBtnNew);
        GformNew.appendChild(submitBtnNewWrapper);

        // fonction à appelé après pour affiché le travail mis à jour
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

            // Ajouter l'écouteur d'événements à chaque élément de subBtnNewV
            let subBtnNewV = document.querySelectorAll(".submit-btn-new");
            subBtnNewV.forEach(element => {
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

        GformNew.addEventListener("submit", async function (event) {
            event.preventDefault(); // Empêche le comportement par défaut du navigateur lors de la soumission du formulaire

            // Récupérer les valeurs des champs d'entrée
            const title = document.getElementById('title-zone-ajout').value;
            const categoryId = selectCategoryNew.value;
            



           

           // Créer un objet FormData et y ajouter les valeurs
const formData = new FormData();
formData.append('title', title);
formData.append('categoryId', categoryId);
formData.append('imageURL', imageFile); // Ajoutez le fichier d'image          
console.log('formData :', inputFileNew.files[0]);

            // Envoyer la requête fetch

            fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                    'Accept': 'application/json',
                },
                body: formData
            })
                .then(response => {
                    if (!response.ok) {
                        // Select the input elements
                        const inputs = document.querySelectorAll('input.input-reaction, select.input-reaction');

                        // Add the 'bad' class to each input element
                        inputs.forEach(input => {
                            input.classList.add('bad');
                        });

                        throw new Error('La requête a échoué avec le statut : ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Travail ajouté avec succès :', data);
                    pollWorks();
                    cacherPopupNew();
                })
                .catch(error => {
                    console.error('Une erreur est survenue lors de la requête :', error.message);
                    throw error;

                });
        });

        popupBackgroundNew.addEventListener("click", (event) => {
            if (event.target === popupBackgroundNew) {
                cacherPopupNew()
            }
        });
    }

    popupBackgroundNew.classList.add("active");
}

function cacherPopupNew() {
    let popupBackgroundNew = document.querySelector(".popupBackgroundNew")
    popupBackgroundNew.classList.remove("active")
}


