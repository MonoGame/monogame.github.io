'use strict';

const resources = require('../../_data/resources.json');

/** @param {import("@11ty/eleventy/src/TemplateCollection")} api */
function resourcesCollection(api) {
    return resources;
}

module.exports = resourcesCollection;
