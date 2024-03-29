

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

        // Add an event listener to trigger the click on the input when the div is clicked
        cadreDivNew.addEventListener("click", function () {
            imageInput.click();
        });

        GformNew.appendChild(cadreDivNew);






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
                console.log('Title changed:', title); // Add this line
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
                console.log('Category changed:', categoryId);
                resolve(categoryId); // Resolve the promise when the selection changes
            });
        });
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



        let FormPost = new FormData();

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

        GformNew.addEventListener("submit", async function (event) {
            event.preventDefault(); // Empêche le comportement par défaut du navigateur lors de la soumission du formulaire

            // Créer un objet FormData et y ajouter les valeurs
            const [title, categoryId] = await Promise.all([titlePromise, categoryPromise])
            FormPost.append('title', title);
            FormPost.append('categoryId', categoryId);

            // Ajouter imageInputListener.files[0] à FormPost
            if (imageInputListener && imageInputListener.files && imageInputListener.files[0]) {
                FormPost.append('imageUrl', imageInputListener.files[0]);
            }

            console.log(FormPost.get('title'));
            console.log(FormPost.get('categoryId'));
            console.log(FormPost.get('imageUrl'));

            console.log('image du bien id = ', document.getElementById("images_du_bien").files[0]);
            let imageElement = document.querySelector(".imageElement");
            if (imageElement) {
                console.log('src de imageElement est', imageElement.src);
            } else {
                console.log('imageElement n\'existe pas');
            }


            // Envoyer la requête fetch
            fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
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
                    console.log('Travail ajouté avec succès :', data);
                })
                .catch(error => {
                    console.error(error);
                });
        });
    };


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
