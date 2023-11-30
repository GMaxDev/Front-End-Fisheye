/* eslint-disable no-inner-declarations */
import { MediasPhotographers } from '../models/MediasPhotographers';
import { closeModal, displayModal } from '../utils/contactForm';
import {
    closebuttonFilter,
    displaybuttonFilter,
} from '../utils/displayButtonFilter';
import { closeModalImg } from '../utils/displayBigImg';
import { chevronDirection } from '../utils/chevronDirection';
import {
    openFullScreen,
    displayFullSizeImage,
} from '../utils/modalMediasFullSize';
// On récupère l'ID passé en paramètre
const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get('id');
const dataJson = '/data/photographers.json';
const myForm = document.getElementById('myForm');
let currentIndex = 0;
let totalLikes = 0;
let photo = [];
let mediaElements = [];
console.log(`ID: ${idParam}`);

const contactButtonElement = document.querySelector('.contact_button');
contactButtonElement.addEventListener('click', () => {
    displayModal();
    const modalFocus = document.getElementById('name');
    modalFocus.focus();
});

const default_filter = document.getElementById('default_filter');
const filter_buttons = document.getElementById('default_filter');
filter_buttons.addEventListener('click', () => {
    displaybuttonFilter();
    // filter_buttons.style.display = 'none'
});

const modalButtonCloseElement = document.querySelector(
    '#modal-header .closeBtn'
);
modalButtonCloseElement.addEventListener('click', closeModal);
const imgModalButtonCloseElement = document.querySelector(
    '#img_modal .closeBtn'
);
imgModalButtonCloseElement.addEventListener('click', closeModalImg);

document.addEventListener('keydown', (event) => {
    // Vérifier si la touche appuyée est "Escape" (code 27)
    if (event.key === 'Escape') {
        closeModal();
        closeModalImg();
    }
});

fetch(dataJson)
    .then((response) => response.json())
    .then((data) => {
    // On recherche le photographe avec l'ID correspondant
        const photographer = data.photographers.find(
            (item) => item.id === parseInt(idParam)
        );

        if (photographer) {
            const photographerId = photographer.id;
            const photographerName = photographer.name;
            const photographerCity = photographer.city;
            const photographerCountry = photographer.country;
            const photographerTagline = photographer.tagline;
            const photographerPrice = photographer.price;
            const photographerPortrait = `assets/photographers/${photographer.portrait}`;
            console.log('Nom du photographe : ' + photographerName);

            //-----------------------------------------------------------------------

            const main = document.querySelector('main');
            const header = document.querySelector('.photograph-header');
            const div = document.createElement('div');
            div.setAttribute('class', 'photographer-info');
            header.insertBefore(div, header.firstChild);

            const h1 = document.createElement('h1');
            const h2 = document.createElement('h2');
            const h3 = document.createElement('h3');
            const img = document.createElement('img');

            img.setAttribute('src', photographerPortrait);
            h1.textContent = photographerName;
            h2.textContent = photographerCity + ', ' + photographerCountry;
            h3.textContent = photographerTagline;

            div.appendChild(h1);
            div.appendChild(h2);
            div.appendChild(h3);
            header.appendChild(img);

            //----------------------------------------------

            // Je crée une liste dans laquelle les photos seront placées
            const ul = document.createElement('ul');
            ul.setAttribute('id', 'medias-list');
            main.appendChild(ul);

            // Je filtre mon jsn pour ne conserver dans un tableau que les photos du photographe avec le bon ID
            const photographerMedias = data.media.filter(
                (media) => media.photographerId === photographerId
            );

            // J'instancie ma class MediasPhotographers
            photo = photographerMedias.map(
                (item) => new MediasPhotographers({ media: item })
            );

            // Je récupère le nom du dossier image en fonction du nom du photographe
            const namePart = photographerName.split(' ');
            // Je remplace les tirets par des espaces
            let shortName = namePart.slice(0, -1).join(' ');
            shortName = shortName.replace(/-/g, ' ');

            function updateMediaList() {
                ul.innerHTML = '';
                // Je boucle pour afficher mes images
                photo.forEach((media, index) => {
                    let mediaElement;
                    if (media.image) {
                        const cheminImage = `assets/images/list_medias_photographers/${shortName}/${media.image}`;
                        mediaElement = document.createElement('img');
                        mediaElement.src = cheminImage;
                        mediaElement.setAttribute('tabindex', '0');
                        mediaElement.setAttribute('alt', media.title);
                    } else if (media.video) {
                        const cheminVideo = `assets/images/list_medias_photographers/${shortName}/${media.video}`;
                        mediaElement = document.createElement('video');
                        mediaElement.src = cheminVideo;
                        mediaElement.setAttribute('type', 'video/mp4');
                        mediaElement.dataset.index = index; // Ajoutez l'index en tant qu'attribut de données
                        mediaElement.setAttribute('tabindex', '0');
                    }
                    const button = document.createElement('button');
                    button.setAttribute('class', 'media-element');
                    button.setAttribute('tabindex', '-1');
                    const div = document.createElement('div');
                    div.setAttribute('class', 'photo-data');
                    const imageTitle = document.createElement('h4');
                    imageTitle.textContent = media.title;
                    const imageLike = document.createElement('p');
                    imageLike.innerHTML = `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#911C1C"/>
                    </svg>
                `;
                    const likeNumber = document.createElement('span');
                    likeNumber.innerHTML = media.likes;
                    likeNumber.setAttribute('tabindex', '0');

                    ul.appendChild(button);
                    button.appendChild(mediaElement);
                    button.appendChild(div);
                    div.appendChild(imageTitle);
                    div.appendChild(imageLike);
                    imageLike.appendChild(likeNumber);

                    totalLikes += media.likes;

                    div.addEventListener('click', () => {
                        media.toggleLike();
                        likeNumber.innerHTML = media.likes;
                        if (media.isLiked) {
                            totalLikes++;
                        } else {
                            totalLikes--;
                        }
                        displayLikes.innerHTML = `${totalLikes} &#9829`;
                    });

                    div.addEventListener('keydown', () => {
                        media.toggleLike();
                        likeNumber.innerHTML = media.likes;
                        if (media.isLiked) {
                            totalLikes++;
                        } else {
                            totalLikes--;
                        }
                        displayLikes.innerHTML = `${totalLikes} &#9829`;
                    });

                    mediaElement.addEventListener('keydown', (event) => {
                        // Vérifier si la touche appuyée est "Escape" (code 27)
                        if (event.key === 'Enter') {
                            openFullScreen(
                                mediaElements,
                                index,
                                document.getElementById('fullSizeImage')
                            );
                        }
                    });

                    mediaElements = document.querySelectorAll(
                        '.media-element img, .media-element video'
                    );
                    mediaElements.forEach((media, index) => {
                        media.addEventListener('click', () => {
                            currentIndex = index;
                            openFullScreen(
                                mediaElements,
                                index,
                                document.getElementById('fullSizeImage')
                            );
                        });
                    });
                });
            }

            updateMediaList();

            //----------------------------------------------

            document.getElementById('popularity').addEventListener('click', () => {
                toggleFilter('popularity');
                closebuttonFilter();
                filter_buttons.style.display = 'block';
                default_filter.innerHTML = 'Popularité';
                chevronDirection(default_filter);
            });
            document.getElementById('date').addEventListener('click', () => {
                toggleFilter('date');
                closebuttonFilter();
                filter_buttons.style.display = 'block';
                default_filter.innerHTML = 'Date';
                chevronDirection(default_filter);
            });
            document.getElementById('title').addEventListener('click', () => {
                toggleFilter('title');
                closebuttonFilter();
                filter_buttons.style.display = 'block';
                default_filter.innerHTML = 'Titre';
                chevronDirection(default_filter);
            });

            let currentFilter = null;
            let isAscending = true;

            function toggleFilter(filter) {
                //Permet de savoir si le filtre en cours est l'inverse du précédent ou pas
                if (currentFilter === filter) {
                    isAscending = !isAscending;
                } else {
                    currentFilter = filter;
                    isAscending = true;
                }
                totalLikes = 0;
                sortItems(currentFilter);
            }

            function sortItems(currentFilter) {
                // const items = document.querySelectorAll('.toto')
                const itemsArray = Array.from(photo);
                switch (currentFilter) {
                case 'popularity':
                    itemsArray.sort((a, b) =>
                        isAscending ? a.likes - b.likes : b.likes - a.likes
                    );
                    break;
                case 'date':
                    itemsArray.sort((a, b) => {
                        const dateA = new Date(a.date).toISOString();
                        const dateB = new Date(b.date).toISOString();
                        return isAscending
                            ? dateA.localeCompare(dateB)
                            : dateB.localeCompare(dateA);
                    });
                    break;
                case 'title':
                    itemsArray.sort((a, b) =>
                        isAscending
                            ? a.title.localeCompare(b.title)
                            : b.title.localeCompare(a.title)
                    );
                    break;
                default:
                    return;
                }
                photo = itemsArray;
                updateMediaList();
            }

            //----------------------------------------------

            document.getElementById('leftDirection').addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--; // Aller à l'image précédente si l'index est supérieur à 0
                    displayFullSizeImage(
                        mediaElements,
                        currentIndex,
                        document.getElementById('fullSizeImage')
                    );
                }
            });

            document.addEventListener('keydown', (event) => {
                // Vérifier si la touche appuyée est "Escape" (code 27)
                if (event.key === 'ArrowLeft') {
                    if (currentIndex > 0) {
                        currentIndex--; // Aller à l'image précédente si l'index est supérieur à 0
                        displayFullSizeImage(
                            mediaElements,
                            currentIndex,
                            document.getElementById('fullSizeImage')
                        );
                    }
                }
            });

            // Gestionnaire d'événement pour la flèche droite
            document
                .getElementById('rightDirection')
                .addEventListener('click', () => {
                    if (currentIndex < mediaElements.length - 1) {
                        currentIndex++; // Aller à l'image suivante si l'index est inférieur à la longueur totale des images
                        displayFullSizeImage(
                            mediaElements,
                            currentIndex,
                            document.getElementById('fullSizeImage')
                        );
                    }
                });

            document.addEventListener('keydown', (event) => {
                // Vérifier si la touche appuyée est "Escape" (code 27)
                if (event.key === 'ArrowRight') {
                    if (currentIndex < mediaElements.length - 1) {
                        currentIndex++; // Aller à l'image suivante si l'index est inférieur à la longueur totale des images
                        displayFullSizeImage(
                            mediaElements,
                            currentIndex,
                            document.getElementById('fullSizeImage')
                        );
                    }
                }
            });
            // ---------------------------------------------

            const aside = document.createElement('aside');
            aside.setAttribute('id', 'photographer-specs');
            main.appendChild(aside);

            let displayLikes = document.createElement('p');
            displayLikes.innerHTML = `${totalLikes} &#9829`;
            aside.appendChild(displayLikes);

            const pricePhotorapher = document.createElement('p');
            pricePhotorapher.textContent = `${photographerPrice} € / jour`;
            aside.appendChild(pricePhotorapher);

            //----------------------------------------------

            const modal = document.getElementById('modal-header');
            if (modal) {
                const modalH2 = modal.querySelector('h2');
                if (modalH2) modalH2.textContent += ' ' + photographerName;
                else console.error('Pas de h2');
            } else {
                console.error(
                    'L\'élément avec la classe \'modal-header\' est introuvable.'
                );
            }
        } else {
            console.error('Aucun photographe trouvé avec l\'ID ' + idParam);
        }
    })
    .catch((error) => {
        console.error('Erreur lors du chargement du JSON :', error);
    });

//----------------------------------------------

myForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // Récupère tous les champs du formulaire
    const formFields = myForm.elements;

    // Affiche chaque champ dans la console
    for (let i = 0; i < formFields.length; i++) {
        console.log(`${formFields[i].id} : ${formFields[i].value}`);
    }
});
