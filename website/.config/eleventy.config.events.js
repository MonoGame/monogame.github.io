'use strict'

const fs = require('fs');
const path = require('path');
const docfxBuilder = require('./events/before/docfx');
const sitemap = require('./events/after/sitemap');

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
    config.on('eleventy.before', async ({ dir, runMode, outputMode }) => {
        await docfxBuilder().catch((reason) => console.log(reason));
    })
}
