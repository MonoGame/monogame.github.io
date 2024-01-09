'use strict'

const yaml = require('js-yaml');

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
    config.addDataExtension('yml', function (content) {
        return yaml.load(content);
    });
}
