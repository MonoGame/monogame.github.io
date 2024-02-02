'use strict'

const docfxBuilder = require('./events/before/docfxBuilder');

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
    config.on('eleventy.before', async ({ dir, runMode, outputMode }) => {
        await docfxBuilder().catch((reason) => console.log(reason));
    })
}
