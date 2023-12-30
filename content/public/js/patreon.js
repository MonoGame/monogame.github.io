(async () => {
    'use strict';
    
    const response = await fetch('https://api.patreon.com/platform/users?filter[patreon_url]=https://www.patreon.com/MonoGame');
    const data = await response.json();
    
    if(data.included && data.included.length > 0) {
        const attributes = data.included[0].attributes;
        const patron_count = attributes.patron_count;
        const pledge_sum = (attributes.pledge_sum / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: attributes.pledge_sum_currency
        });

        const total_patrons = document.getElementById('total-patrons');
        total_patrons.innerText = patron_count;

        const per_month = document.getElementById('per-month');
        per_month.innerText = pledge_sum
    }

})();
