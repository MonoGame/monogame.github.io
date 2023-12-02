(() => {
    'use strict'

    const shuffle = (array) => {
        let currentIndex = array.length;
        let temp, randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temp = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temp;
        }
    }

    const createCreditLogoElement = (game) => {
        let anchor = document.createElement('a');
        anchor.setAttribute('href', game.url);
        
        let image = document.createElement('img');
        image.setAttribute('src', `${BannerPath}${game.logo}`);
        image.style.filter = 'drop-shadow(6px 6px 6px #000C)';

        anchor.append(image);
        return anchor;
    }

    const createBuiltWithMonoGameElement = () => {
        let anchor = document.createElement('a');
        anchor.setAttribute('href', 'https://twitter.com/search?q=BuiltWithMonoGame');
        anchor.innerText = '#BuiltWithMonoGame'
        anchor.style.color = '#fff';
        anchor.style.fontWeight = 'bold';
        anchor.style.textDecoration = 'none';
        anchor.style.backgroundColor = 'transparent';
        anchor.style.textShadow = '2px 2px 6px rgba(33, 37, 41, 1)';
        return anchor;
    }

    const createCreditsElement = (game) => {
        let div = document.createElement('div');
        div.className = 'carousel-caption d-flex flex-row justify-content-end';
        let innerDiv = document.createElement('div');
        innerDiv.className = 'd-flex flex-column align-items-center';
        
        innerDiv.appendChild(createCreditLogoElement(game));
        innerDiv.appendChild(createBuiltWithMonoGameElement());
        div.appendChild(innerDiv);
        return div;
    }



    const createCarouselItem = (game, isActive) => {
        let carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item h-100 ${(isActive ? 'active' : '')}`;
        carouselItem.setAttribute('data-bs-interval', '10000');
        carouselItem.style.backgroundRepeat = 'no-repeat';
        carouselItem.style.backgroundPosition = 'center';
        carouselItem.style.backgroundImage = `url("${BannerPath}${game.screenshot}")`;
        carouselItem.style.backgroundSize = 'cover';
        carouselItem.style.imageRendering = game.pixelart ? 'pixelated' : 'auto';
        carouselItem.style['-ms-interpolation-mode'] = game.pixelart ? 'nearest-neighbor' : 'bicubic';
        carouselItem.appendChild(createCreditsElement(game));
        return carouselItem;
    }

    const initializeCarousel = () => {
        shuffle(games);
        let container = document.getElementById('carousel-item-container');

        games.filter((game) => game.tags.includes('Featured')).forEach((game, index) => {
            let carouselItem = createCarouselItem(game, index === 0);
            container.appendChild(carouselItem);
        });
    }

    initializeCarousel();
})();