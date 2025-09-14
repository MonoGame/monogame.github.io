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

		// Get all the carousel items from the document.
        let container = document.getElementById('carousel-item-container');
        let items = Array.from(container.getElementsByClassName('carousel-item'));

		// Remove them before we add them back shuffled.
		for(let i = 0; i < items.length; i++)
            container.removeChild(items[i]);

		// Since we made a copy we can shuffle it directly.
        shuffle(items);

		// Add the items back in the new order.
        for(let i = 0; i < items.length; i++)
            container.appendChild(items[i]);

		// Make the first one visible.
		container.children[0].className += ' active';
    }

    initializeCarousel();

})();
