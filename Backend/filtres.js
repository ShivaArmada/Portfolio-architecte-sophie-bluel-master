//  pour les filtres de la page index
// 1. Filtre par catégorie

document.querySelectorAll(".filter").forEach(filter => {
    filter.addEventListener("click", () => {
        if (filter.dataset.categoryId != "0") {
            // Exécuter la requête pour obtenir les données
            getWorks().then(data => {
                // Filtrer les données après avoir reçu la réponse de la requête
                let filteredData = data.filter(item => item.categoryId == filter.dataset.categoryId);

                displaySelectedCategory(filteredData)
            });
        } else {
            getWorks().then(data => {
                displaySelectedCategory(data)
            })
        }

    })
})

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

function getWorks() {
    // URL à utiliser pour la requête GET
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

getWorks().then(data => {
    displaySelectedCategory(data)
})
