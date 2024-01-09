(() => {
    'use strict';
    
    const shuffleShowcaseItems = () => {
        let container = document.getElementById('showcase-gallery');
        let items = container.getElementsByClassName('showcase-item');
        const order = Array.from( {length: items.length}, (value, index) => index);
        shuffle(order);
        for(let i = 0; i < order.length; i++) {
            container.appendChild(items[order[i]]);
        }
    }

    shuffleShowcaseItems();
})();
