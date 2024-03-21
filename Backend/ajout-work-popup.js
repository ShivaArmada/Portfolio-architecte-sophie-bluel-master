

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

        let modifTitleNew = document.createElement("h3");
        modifTitleNew.textContent = "Ajout Photo";
        modifTitleNew.classList.add("modif-title");
        GformNew.appendChild(modifTitleNew);

        let cadreDivNew = document.createElement("div");
        cadreDivNew.classList.add("cadre-div");
        GformNew.appendChild(cadreDivNew);

        let spanLogoNew = document.createElement("span");
        spanLogoNew.innerHTML = `<i class="fa-solid fa-image"></i>`;
        cadreDivNew.appendChild(spanLogoNew);

        let pAddPhotoNew = document.createElement("p");
        pAddPhotoNew.innerText = "+ Ajouter photo";
        cadreDivNew.appendChild(pAddPhotoNew);

        let pFormatNew = document.createElement("p");
        pFormatNew.innerText = "jpg, png : 4mo max";
        cadreDivNew.appendChild(pFormatNew);

        let inputTitleNew = document.createElement("input");
        inputTitleNew.setAttribute("type", "text");
        inputTitleNew.setAttribute("placeholder", "Titre");
        GformNew.appendChild(inputTitleNew);

        let selectCategoryNew = document.createElement("select");
        selectCategoryNew.setAttribute("name", "category");

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

                GformNew.appendChild(selectCategoryNew);
            })
            .catch(error => {
                console.error('Une erreur est survenue lors de la requête :', error.message);
                throw error;
            });

        let submitBtnNew = document.createElement("input");
        submitBtnNew.setAttribute("type", "submit");
        submitBtnNew.value = "Valider";
        GformNew.appendChild(submitBtnNew);

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
