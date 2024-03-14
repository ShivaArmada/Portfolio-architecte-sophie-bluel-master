//  pour les filtres de la page index
// 1. Filtre par catégorie

// Sélectionnez tous les boutons de filtre
const filterButtons = document.querySelectorAll('.filter');

// Sélectionnez tous les éléments de la galerie
const galleryItems = document.querySelectorAll('.gallery figure');

// Ajoutez un gestionnaire d'événements de clic à chaque bouton de filtre
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Obtenez la catégorie du bouton cliqué
        const category = button.querySelector('p').id;

        // Cachez tous les éléments de la galerie
        galleryItems.forEach(item => {
            item.style.display = 'none';
        });

        // Affichez uniquement les éléments de la catégorie sélectionnée
        const itemsToShow = document.querySelectorAll(`.gallery .${category}`);
        itemsToShow.forEach(item => {
            item.style.display = 'block';
        });
    });
});