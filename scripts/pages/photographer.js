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
        const photographerCity = photographer.city
        const photographerCountry = photographer.country
        const photographerTagline = photographer.tagline
        const photographerPortrait = `assets/photographers/${photographer.portrait}`
        console.log('Nom du photographe : ' + photographerName);

        //-----------------------------------------------------------------------

        const header = document.querySelector(`.photograph-header`)
        const div = document.createElement('div');
        div.setAttribute("class", `photographer-info`)
        header.insertBefore(div, header.firstChild)

        const h1 = document.createElement('h1');
        const h2 = document.createElement('h2');
        const h3 = document.createElement('h3');
        const img = document.createElement('img');

        img.setAttribute("src", photographerPortrait)
        h1.textContent = photographerName
        h2.textContent = photographerCity + ', ' + photographerCountry;
        h3.textContent = photographerTagline;

        div.appendChild(h1)
        div.appendChild(h2)
        div.appendChild(h3)
        header.appendChild(img)

    } else {
    console.error('Aucun photographe trouvé avec l\'ID ' + idParam);
    }
})
.catch(error => {
    console.error('Erreur lors du chargement du JSON :', error);
});