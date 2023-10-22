function photographerTemplate(data) {
    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute("id", id)
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        const h3 = document.createElement( 'h3' )
        const h4 = document.createElement( 'h4' )
        const h5 = document.createElement( 'h5' )
        h2.textContent = name;
        h3.textContent = city + ', ' + country;
        h4.textContent = tagline;
        h5.textContent = price + '€/jour';
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);

        // J'ajoute un gestionnaire d'événements "click" à l'article
        article.addEventListener('click', () => {
            const clickedId = article.id;
            const newPageURL = `http://127.0.0.1:5500/photographer.html?id=${clickedId}`;
            window.location.href = newPageURL;
        });

        return article;
    }
    return { name, id, picture, city, country, tagline, price, getUserCardDOM }
}
