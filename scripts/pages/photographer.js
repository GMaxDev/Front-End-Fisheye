//Mettre le code JavaScript lié à la page photographer.html
// On récupère l'ID passé en paramètre
const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get('id');
console.log(`ID: ${idParam}`)

fetch('/data/photographers.json')
.then(response => response.json())
.then(data => {
    // On recherche le photographe avec l'ID correspondant
    const photographer = data.photographers.find(item => item.id === parseInt(idParam));

    if (photographer) {
    const photographerName = photographer.name;
    console.log('Nom du photographe : ' + photographerName);

    //-----------------------------------------------------------------------

    const header = document.getElementsByClassName(`photograph-header`)[0]
    const h1 = document.createElement('h1');
    h1.textContent = photographerName

    header.appendChild(h1)

    } else {
    console.error('Aucun photographe trouvé avec l\'ID ' + idParam);
    }
})
.catch(error => {
    console.error('Erreur lors du chargement du JSON :', error);
});