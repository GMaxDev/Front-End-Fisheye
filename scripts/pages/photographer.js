import { MediasPhotographers } from "../models/MediasPhotographers";
import { closeModal, displayModal } from '../utils/contactForm';
import { closeModalImg } from "../utils/displayBigImg";
// On récupère l'ID passé en paramètre
const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get('id');
const dataJson = '/data/photographers.json'
let currentIndex = 0;
let totalLikes = 0
console.log(`ID: ${idParam}`)

const contactButtonElement = document.querySelector('.contact_button');
contactButtonElement.addEventListener('click', displayModal);

const modalButtonCloseElement = document.querySelector('#modal-header .closeBtn',
);
modalButtonCloseElement.addEventListener('click', closeModal);

const imgModalButtonCloseElement = document.querySelector('#img_modal .closeBtn',
);
imgModalButtonCloseElement.addEventListener('click', closeModalImg);

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
        const photographerPrice = photographer.price
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

        // Je crée une liste dans laquelle les photos seront placées
        const ul = document.createElement('ul')
        ul.setAttribute('id', 'medias-list')
        main.appendChild(ul)

        // Je filtre mon jsn pour ne conserver dans un tableau que les photos du photographe avec le bon ID
        const photographerMedias = data.media.filter(media => media.photographerId === photographerId);

        // J'instancie ma class MediasPhotographers
        const photo = photographerMedias.map(item => new MediasPhotographers(
            {media:item}
        ))
    
        // Je récupère le nom du dossier image en fonction du nom du photographe
        const namePart = photographerName.split(' ')
        // Je remplace les tirets par des espaces
        let shortName = namePart.slice(0, -1).join(' ')
        shortName = shortName.replace(/-/g, ' ')

        // Je boucle pour afficher mes images
        photo.forEach((media, index) => {
            let mediaElement;

            if (media.image) {
                const cheminImage = `assets/images/list_medias_photographers/${shortName}/${media.image}`;
                mediaElement = document.createElement('img');
                mediaElement.src = cheminImage;
            } else if (media.video) {
                const cheminVideo = `assets/images/list_medias_photographers/${shortName}/${media.video}`;
                mediaElement = document.createElement('video');
                mediaElement.src = cheminVideo;
                mediaElement.setAttribute('type', 'video/mp4');
                mediaElement.setAttribute('controls', '');
                mediaElement.dataset.index = index; // Ajoutez l'index en tant qu'attribut de données
            }
            const li = document.createElement('li')
            li.setAttribute('class', 'media-element')
            const div = document.createElement('div')
            div.setAttribute('class', 'photo-data')
            const imageTitle = document.createElement('h4')
            imageTitle.textContent = media.title
            const imageLike = document.createElement('p')
            imageLike.innerHTML  = `${media.likes} <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#911C1C"/>
                </svg>
            `
            ul.appendChild(li)
            li.appendChild(mediaElement)
            li.appendChild(div)
            div.appendChild(imageTitle)
            div.appendChild(imageLike)

            totalLikes += media.likes;
            mediaElement.addEventListener('click', (event) => {
                const dataIndex = event.target.dataset.index
                openFullScreen(dataIndex, document.getElementById('fullSizeImage'));
            });
        });

        //----------------------------------------------

        document.getElementById('popularity').addEventListener('click', () => toggleFilter('popularity'))
        document.getElementById('date').addEventListener('click', () => toggleFilter('date'))
        document.getElementById('title').addEventListener('click', () => toggleFilter('title'))

        let currentFilter = null
        let isAscending = true

        function toggleFilter(filter) { //Permet de savoir si le filtre en cours est l'inverse du précédent ou pas
            if (currentFilter === filter) {
                isAscending = !isAscending
            } else {
                currentFilter = filter
                isAscending = true
            }
            sortItems(currentFilter)
        }

        function sortItems(currentFilter) {
            // const items = document.querySelectorAll('.toto')
            const itemsArray = Array.from(photo)
            switch (currentFilter) {
                case 'popularity':
                    itemsArray.sort(function(a, b) {
                        return a.likes - b.likes
                    })
                    break;
                case 'date':
                  // Mettez ici votre logique de tri pour Date
                    break;
                case 'title':
                  // Mettez ici votre logique de tri pour Titre
                    break;
                default:
                    return;
                }
        }

        //----------------------------------------------

        const mediaElements = document.querySelectorAll('.media-element img, .media-element video');
        mediaElements.forEach((media, index) => {
            media.addEventListener('click', () => {
                openFullScreen(index, document.getElementById('fullSizeImage'));
            });
        });
        
        function openFullScreen(index, fullSizeImg) {
            const mediaModal = document.getElementById('img_modal');
            mediaModal.style.display = 'block';
            displayFullSizeImage(index, fullSizeImg);
            currentIndex = index; // Mettre à jour l'index courant
        }
        
        function displayFullSizeImage(index, fullSizeImg) {
            const selectedMedia = mediaElements[index];
            if (selectedMedia.tagName === 'IMG') {
                // Si c'est une image, affichez la balise img
                fullSizeImg.innerHTML = `<img src="${selectedMedia.src}" alt="${selectedMedia.alt}" />`;
            } else if (selectedMedia.tagName === 'VIDEO') {
                // Si c'est une vidéo, affichez la balise video
                fullSizeImg.innerHTML = `<video src="${selectedMedia.src}" type="video/mp4" controls></video>`;
            }
        }         

        // Gestionnaire d'événement pour la flèche gauche
        document.getElementById('leftDirection').addEventListener('click', () => {
            if (currentIndex > 0) {
            currentIndex--; // Aller à l'image précédente si l'index est supérieur à 0
            displayFullSizeImage(currentIndex, document.getElementById('fullSizeImage'));
            }
        });
        
        // Gestionnaire d'événement pour la flèche droite
        document.getElementById('rightDirection').addEventListener('click', () => {
            if (currentIndex < mediaElements.length - 1) {
            currentIndex++; // Aller à l'image suivante si l'index est inférieur à la longueur totale des images
            displayFullSizeImage(currentIndex, document.getElementById('fullSizeImage'));
            }
        });
        // ---------------------------------------------

        const aside = document.createElement('aside')
        aside.setAttribute('id', 'photographer-specs')
        main.appendChild(aside)

        const allLikes = document.createElement('p')
        allLikes.innerHTML = `${totalLikes} &#9829`
        aside.appendChild(allLikes)

        const pricePhotorapher = document.createElement('p')
        pricePhotorapher.textContent = `${photographerPrice} € / jour`
        aside.appendChild(pricePhotorapher)

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
