(async () => {
    'use strict';

    function countUp(element, end, format) {
        const speed = 20;
        const increment = Math.ceil(end / speed);
        let value = 0;

        if(value < end) {
            const interval = setInterval(() => {
                if(value + increment >= end) {
                    element.textContent = format(end);
                    clearInterval(interval);
                } else {
                    value += increment;
                    element.textContent = format(value);
                }
            }, speed);
        }
    }

    const response = await fetch('https://api.patreon.com/platform/users?filter[patreon_url]=https://www.patreon.com/MonoGame');
    const data = await response.json();

    if(data.included && data.included.length > 0) {
        const attributes = data.included[0].attributes;
        const patron_count = attributes.patron_count;
        const pledge_sum = attributes.pledge_sum;

        const total_patrons = document.getElementById('total-patrons');
        countUp(total_patrons, patron_count, (x) => x);

        const per_month = document.getElementById('per-month');
        countUp(per_month, pledge_sum, (x) => (x / 100).toLocaleString('en-US', {
                 style: 'currency',
                 currency: attributes.pledge_sum_currency
            }));
    }

})();
