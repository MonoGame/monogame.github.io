(() => {
    'use strict';

    const toc = document.getElementById('tableOfContents');
    const tocFilter = document.getElementById('toc-filter');
    const tocItems = toc.querySelectorAll('.nav-item');

    tocFilter.addEventListener('input', function() {
        const filterValue = tocFilter.value.toLowerCase().trim();

        if(!filterValue || filterValue === '') {
            reset();
        } else {
            tocItems.forEach((item) => {
                const itemLink = item.querySelector('.nav-link');
                const itemName = itemLink.textContent.toLowerCase();

                const matchesFilter = itemName.includes(filterValue);

                if(matchesFilter) {
                    showItem(item);
                } else {
                    hideItem(item);
                }
            });
        }
    });

    function reset() {
        tocItems.forEach((item) => {
            const collapse = item.querySelector('.collapse');
            if(collapse) {
                const hasActive = item.querySelector('.active');
                if(hasActive) {
                    collapse.classList.add('show');
                } else {
                    collapse.classList.remove('show');
                }
            }
            item.classList.remove('d-none');
        })
    }

    function showItem(item) {
        item.classList.remove('d-none');     
        const parent = item.parentElement.closest('.nav-item');

        if(parent) {
            const collapse = parent.querySelector('.collapse');
            collapse.classList.add('show');
            showItem(parent);
        }
    }

    function hideItem(item) {
        item.classList.add('d-none');
        const children = item.querySelectorAll('.nav-item');
        children.forEach(child => hideItem(child));
    }
})();
