(() => {
    'use strict';
    
    const shuffle = (items) => {
        let currentIndex = items.length;
        let temp, randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temp = items[currentIndex];
            items[currentIndex] = items[randomIndex];
            items[randomIndex] = temp;
        }
    }

    const initializeCarousel = () => {
        let container = document.getElementById('carousel-item-container');
        let items = container.getElementsByClassName('carousel-item');
        const order = Array.from( {length: items.length}, (value, index) => index);
        shuffle(order);
        for(let i = 0; i < order.length; i++) {
            container.appendChild(items[order[i]]);
        }
        container.children[0].className += ' active';

    }

    initializeCarousel();

})();
