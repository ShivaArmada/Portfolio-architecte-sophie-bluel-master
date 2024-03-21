

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
        inputFileNew.setAttribute("accept", "image/png, image/jpeg");
        inputFileNew.classList.add("input-file");
        inputFileNew.style.display = "none"; // Cacher l'input
        cadreDivNew.appendChild(inputFileNew);

        // Ajouter un écouteur d'événements pour déclencher le clic sur l'input lorsque la div est cliquée
        cadreDivNew.addEventListener("click", function () {
            inputFileNew.click();
        });

        GformNew.appendChild(cadreDivNew);

        function updateVisualisation() {
            const preview_square = document.querySelector("cadre-div")[0];
            const imgInput = document.querySelector("input-file");

            if (imgInput.files && imgInput.files[0]) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    const imageUrl = e.target.result;
                    const imageElement = `<img src="${imageUrl}" loading="lazy" decoding="async">`;

                    preview_square.innerHTML = imageElement;
                };

                // Lire le fichier en tant que données URL
                reader.readAsDataURL(imgInput.files[0]);
            } else {
                const imageElement = `<img src="./media/aucune-image.png" loading="lazy" decoding="async">`;

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

transitionPopup();
