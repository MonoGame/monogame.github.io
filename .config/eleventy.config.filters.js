'use strict'

const readableDate = require('./filters/readableDate');
const tableOfContents = require('./filters/tableOfContents');
const cssmin = require('./filters/cssmin');

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
    //  Convert date values into human readable dates
    config.addFilter('readableDate', readableDate);

    //  Creates a table of contents based on a given toc collection
    config.addFilter('tableOfContents', tableOfContents);

    config.addFilter('cssmin', cssmin);
}
