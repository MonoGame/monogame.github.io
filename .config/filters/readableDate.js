'use strict';

const { DateTime } = require('luxon');

module.exports = function(date) {
    return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED);
}
