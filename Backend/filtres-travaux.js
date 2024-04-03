//  pour les filtres de la page index
//  Filtre par catégorie

// URL à utiliser pour la requête GET filtres
const url = 'http://localhost:5678/api/categories';

// Options de la requête GET
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

// Retourner la promesse de la réponse de la requête
fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('La requête a échoué avec le statut : ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        // Afficher les données dans la console
        //on fais une base d'html pour travaux, comme dans le html fournis de base

        //chaque bouton filtre est créé avec un id de catégorie en suivant le shémas de l'api
        data.forEach(item => {
            document.getElementsByClassName("filterbar")[0].innerHTML += `
                <button class="filter" data-category-id="${item.id}">
                    <span class="f-text">
                        <p id="h-res-f">${item.name}</p>
                    </span>
                </button>
            `;
        })
        initButtonsListenener();
    })
    .catch(error => {
        // En cas d'erreur, afficher un message d'erreur dans la console et rejeter la promesse
        console.error('Une erreur est survenue lors de la requête :', error.message);
        throw error;
    });


//fonction pour écouter les boutons filtres créés dans le html
function initButtonsListenener() {
    document.querySelectorAll(".filter").forEach(filter => {
        filter.addEventListener("click", () => {
            if (filter.dataset.categoryId != "0") {

                // Exécuter la requête pour obtenir les données
                getWorks().then(data => {
                    // Filtrer les données après avoir reçu la réponse de la requête
                    //on filtre les données reçues par rapport à l'id de la catégorie
                    // méthode filter() pour filtrer les données
                    //les fichiers sont alors dans le tableau data mais filtrés
                    let filteredData = data.filter(item => item.categoryId == filter.dataset.categoryId);
                    //on appel notre fonction qui affiche les travaux en précisant notre tableau filtré
                    displaySelectedCategory(filteredData)
                });
            } else {
                getWorks().then(data => {
                    displaySelectedCategory(data)
                })
            }

        })
    })
}

//afficher les travaux, par rapport aux données reçues de l'api et non à l'html via innerhtml
//on utilise une boucle pour afficher les travaux
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
//fonction pour obtenir les travaux totaux
function getWorks() {
    // URL à utiliser pour la requête GET travaux
    const url = 'http://localhost:5678/api/works';

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

//on appelle la fonction pour obtenir les travaux totaux then on affiche les travaux de la catégorie choisie
//a defaut on affiche tous les travaux
getWorks().then(data => {
    displaySelectedCategory(data)
})
//on exporte les fonctions pour les utiliser dans le fichier galerie modif afin d'affiché les travaux une fois connecté
//les travaux par défauts sont tous présents = utilisables + on pourrait ajouté les boutons filtres dans connected si on voulais
export { getWorks, displaySelectedCategory};

