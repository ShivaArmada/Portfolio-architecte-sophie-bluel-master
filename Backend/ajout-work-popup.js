

//tout le code sera contenue dans cette fonction qui affiche la popup d'ajout de travail qui contient le formulaire
function afficherPopupNew() {
    let popupBackgroundNew = document.querySelector(".popupBackgroundNew");
    if (!popupBackgroundNew) {
        popupBackgroundNew = document.createElement("div");
        popupBackgroundNew.classList.add("popupBackgroundNew");
        document.body.appendChild(popupBackgroundNew);



        // on crée un formulaire pour l'ajout de travail

        let GformNew = document.createElement("form");
        GformNew.classList.add("GformNew");
        popupBackgroundNew.appendChild(GformNew);


        // on crée un bouton pour fermer la popup qui est le même que celui de la popup de modification
        let closeBtnNew = document.createElement("span");
        closeBtnNew.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        closeBtnNew.classList.add("close-icon");
        closeBtnNew.addEventListener("click", cacherPopupNew);
        GformNew.appendChild(closeBtnNew);

        // on crée un bouton de retour qui permet de revenir à la popup principale de modification
        let returnBtn = document.createElement("span");
        returnBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
        returnBtn.classList.add("return-icon");
        returnBtn.addEventListener("click", function () {
            cacherPopupNew();
            afficherPopup();
        });
        GformNew.appendChild(returnBtn);

        //l'intérieur de notre formulaire
        let modifTitleNew = document.createElement("h3");
        modifTitleNew.textContent = "Ajout Photo";
        modifTitleNew.classList.add("modif-title");
        GformNew.appendChild(modifTitleNew);

        let cadreDivNew = document.createElement("div");
        cadreDivNew.classList.add("cadre-div");

        // Create an input for the image
        const imageInput = document.createElement("input");
        imageInput.setAttribute("type", "file");
        imageInput.setAttribute("id", "images_du_bien");
        imageInput.setAttribute("accept", "image/png, image/jpeg");
        imageInput.setAttribute("max-size", "4MB");
        imageInput.classList.add("image-input");
        imageInput.style.display = "none"; // Hide the input
        imageInput.required = true; // Make the input mandatory
        cadreDivNew.appendChild(imageInput);

        //cette fonction est juste pour utilisé l'input file au dessus dans le code, sans pour autant voir le file
        // Add an event listener to trigger the click on the input when the div is clicked
        cadreDivNew.addEventListener("click", function () {
            imageInput.click();
        });

        GformNew.appendChild(cadreDivNew);




        //intérieur du cadre de l'input file

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

        //les deux inputs pour le titre et la catégorie

        let divInputZone1 = document.createElement("div");
        divInputZone1.classList.add("input-zone");

        let inputTitleNew = document.createElement("input");
        inputTitleNew.setAttribute("type", "text");
        inputTitleNew.setAttribute("id", "title-zone-ajout"); // Use "title-zone-ajout" as ID to avoid any confrontation
        inputTitleNew.classList.add("input-reaction");
        divInputZone1.appendChild(inputTitleNew);

        let labelTitleNew = document.createElement("label");
        labelTitleNew.setAttribute("for", "title-zone-ajout");
        labelTitleNew.textContent = "Titre" // Make sure the for attribute matches the new ID of the input element
        divInputZone1.insertBefore(labelTitleNew, inputTitleNew);

        let titlePromise = new Promise(resolve => {
            inputTitleNew.addEventListener('change', function () {
                title = this.value;

                resolve(title); // Resolve the promise when the input changes
            });
        });
        GformNew.appendChild(divInputZone1);

        let divInputZone2 = document.createElement("div");
        divInputZone2.classList.add("input-zone");

        let selectCategoryNew = document.createElement("select");
        selectCategoryNew.setAttribute("name", "category");
        selectCategoryNew.setAttribute("id", "category");
        selectCategoryNew.classList.add("input-reaction");

        // Add event listener for 'change' event
        let categoryPromise = new Promise(resolve => {
            selectCategoryNew.addEventListener('change', function () {
                categoryId = this.value;

                resolve(categoryId); // Resolve the promise when the selection changes
            });
        });
        divInputZone2.appendChild(selectCategoryNew);

        //on crée une option par défaut pour le select qui reste blank et désactivée (purement visuel + pour éviter les erreurs dans le choix)
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

                //on attribue en fonction de la requete, un name et un id à chaque option


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

        //le fameux bouton input submit qui permet de valider le formulaire
        let submitBtnNew = document.createElement("input");
        submitBtnNew.setAttribute("type", "submit");
        submitBtnNew.value = "Valider";
        submitBtnNew.classList.add("submit-btn-new");
        GformNew.appendChild(submitBtnNew);


        submitBtnNewWrapper.appendChild(submitBtnNew);
        GformNew.appendChild(submitBtnNewWrapper);


        //on aura besoin de ce formulaire pour envoyer les données du formulaire (on le remplis quand les promesses sont résolues)
        let FormPost = new FormData();

        //pour la preview de l'image, on utilise une fonction qui permet de voir l'image avant de la télécharger (function e dans un nouveau reader)

        let imgInput;
        let updateVisualisation = function () {
            const preview_square = document.getElementsByClassName("cadre-div")[0];
            imgInput = document.getElementById("images_du_bien");

            if (imgInput.files && imgInput.files[0]) {
                let imageFile = imgInput.files[0]; // Assign the file to imageFile

                const reader = new FileReader();

                reader.onload = function (e) {
                    imageUrl = e.target.result;

                    // Create a new img element
                    const imageElement = document.createElement("img");
                    imageElement.src = imageUrl;
                    imageElement.loading = "lazy";
                    imageElement.className = "imageElement";
                    imageElement.decoding = "async";
                    imageElement.style.maxWidth = "210px";
                    imageElement.style.maxHeight = "170px";

                    // Append the imageElement to preview_square
                    preview_square.appendChild(imageElement);

                    // Hide the spanLogoNew, pAddPhotoNew, and pFormatNew
                    let spanLogoNew = document.querySelector(".fa-solid.fa-image");
                    if (spanLogoNew) spanLogoNew.style.display = 'none';

                    let pAddPhotoNew = document.querySelector(".p-add-photo");
                    if (pAddPhotoNew) pAddPhotoNew.style.display = 'none';

                    let pFormatNew = document.querySelector(".p-format");
                    if (pFormatNew) pFormatNew.style.display = 'none';

                };

                // Read the file as URL data
                reader.readAsDataURL(imageFile);

                return imageFile;
            } else {
                const imageElement = `<i class="fa-regular fa-circle-xmark"></i> style="font-size: 2rem; color: black;"`;

                preview_square.innerHTML = imageElement;
                console.error('No image file selected');
                return null;
            }
        }

        // Add an event listener to the input to call updateVisualisation when the user selects a file
        const imageInputListener = document.getElementsByClassName("image-input")[0];
        imageInputListener.addEventListener("change", function () {
            updateVisualisation();

        });

        //le plus important, la fonction qui permet d'envoyer les données du formulaire

        GformNew.addEventListener("submit", async function (event) {
            event.preventDefault(); // Empêche le comportement par défaut du navigateur lors de la soumission du formulaire

            // le FormData que l'on avait crée plus haut, on lui ajoute les données du formulaire qui reviennent des promises résolues
            const [title, categoryId] = await Promise.all([titlePromise, categoryPromise])
            FormPost.append('title', title);
            FormPost.append('category', categoryId);

            // comme les promises sont résolues, tout dont l'image est aussi dans le file (evenement lié dans le temps) = on peut l'ajouter
            // Ajouter imgInput.files[0] à FormPost
            if (imgInput && imgInput.files && imgInput.files[0]) {
                FormPost.append('image', imgInput.files[0]);
            }




            //maintenant que notre FormData est prêt, il faut demander à l'API de le recevoir
            // Envoyer la requête fetch
            fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                    //pas besoin de lui dire que c'est du json, et que le formdata est du multi-part il le compile déjà automatiquement par le navigateur
                },
                body: FormPost
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('La requête a échoué avec le statut : ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Travail ajouté avec succès :', data);
                    //Multer compile ainsi les données envoyés, et renvoie le nouveau work automatiquement
                    //grace à la réponse de l'API et au getwork + pollwork tjr actifs
                })
                .catch(error => {
                    console.error(error);
                });
        });
    };

    //pour cacher la popup c'est le meme principe que pour la popup de modification
    popupBackgroundNew.addEventListener("click", (event) => {
        if (event.target === popupBackgroundNew) {
            cacherPopupNew()
        }
    });


    popupBackgroundNew.classList.add("active");


    function cacherPopupNew() {
        let popupBackgroundNew = document.querySelector(".popupBackgroundNew")
        popupBackgroundNew.classList.remove("active")
    }

}

//fin de la fonction pour affiché la nouvelle popup