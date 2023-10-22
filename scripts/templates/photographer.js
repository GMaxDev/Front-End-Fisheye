function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
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
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}

