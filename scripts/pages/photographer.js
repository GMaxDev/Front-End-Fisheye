//Mettre le code JavaScript lié à la page photographer.html
// On récupère l'ID passé en paramètre
const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get('id');
const dataJson = '/data/photographers.json'
console.log(`ID: ${idParam}`)

fetch(dataJson)
.then(response => response.json())
.then(data => {
    // On recherche le photographe avec l'ID correspondant
    const photographer = data.photographers.find(item => item.id === parseInt(idParam));

    if (photographer) {
        const photographerId = photographer.id;
        const photographerName = photographer.name;
        const photographerCity = photographer.city
        const photographerCountry = photographer.country
        const photographerTagline = photographer.tagline
        const photographerPortrait = `assets/photographers/${photographer.portrait}`
        console.log('Nom du photographe : ' + photographerName);

        //-----------------------------------------------------------------------

        const main = document.querySelector('main')
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

        //----------------------------------------------

        const photographerMedias = data.media.filter(media => media.photographerId === photographerId);
        console.log(photographerMedias)
        console.log(photographerMedias.length)

        const photo = photographerMedias.map(item => new MediasPhotographers(
            {media:item}
        ))

        const namePart = photographerName.split(' ')
        let shortName = namePart.slice(0, -1).join(' ')
        console.log(shortName)
        shortName = shortName.replace(/-/g, ' ')

        photo.forEach(media => {
            const cheminImage = `assets/images/list_medias_photographers/${shortName}/${media.image}`;
            const imageElement = document.createElement('img');
            imageElement.src = cheminImage;

            main.appendChild(imageElement)
        });

        //----------------------------------------------

        const modal = document.getElementById(`modal-header`)
        if (modal) {
            const modalH2 = modal.querySelector('h2')
            if(modalH2)
                modalH2.textContent += ' ' + photographerName;
            else
                console.error("Pas de h2")
        } else {
            console.error("L'élément avec la classe 'modal-header' est introuvable.");
        }

    } else {
    console.error('Aucun photographe trouvé avec l\'ID ' + idParam);
    }
})
.catch(error => {
    console.error('Erreur lors du chargement du JSON :', error);
});