async function getPhotographers() {
    try {
        const url = '/data/photographers.json';
        const response = await fetch(url); // Effectue la requête pour récupérer le fichier JSON
        if (!response.ok) {
            throw new Error('Erreur de lecture du fichier.json');
        }
        const photographers = await response.json()
        return photographers;
    } catch (error) {
        console.error('Erreur :', error);
        return []; // En cas d'erreur, renvoyer un tableau vide ou gérer l'erreur autrement.
    }
}

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
