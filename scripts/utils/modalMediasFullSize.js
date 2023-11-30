export function openFullScreen(mediaElements, index, fullSizeImg) {
    const mediaModal = document.getElementById('img_modal');
    mediaModal.style.display = 'block';
    displayFullSizeImage(mediaElements, index, fullSizeImg);
    // currentIndex = index; // Mettre à jour l'index courant

    document.getElementById('leftDirection').focus();
}

export function displayFullSizeImage(mediaElements, index, fullSizeImg) {
    const selectedMedia = mediaElements[index];
    if (selectedMedia && selectedMedia.tagName === 'IMG') {
    // Si c'est une image, affichez la balise img
        fullSizeImg.innerHTML = `<img src="${selectedMedia.src}" alt="${selectedMedia.alt}" />`;
    } else if (selectedMedia && selectedMedia.tagName === 'VIDEO') {
    // Si c'est une vidéo, affichez la balise video
        fullSizeImg.innerHTML = `<video src="${selectedMedia.src}" type="video/mp4" controls></video>`;
    }
    fullSizeImg.innerHTML += `<h3>${selectedMedia.alt}</h3>`;
}
