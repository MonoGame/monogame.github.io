'use strict';

const resources = require('../../_data/resources.json');

/** @param {import("@11ty/eleventy/src/TemplateCollection")} api */
function resourceTags(api) {
    let tags = [];

    resources.forEach((resource) => {
        if(resource.tags) {
            tags.push(...resource.tags);
        }
    });

    tags = tags.filter((value, index) => tags.indexOf(value) === index).sort();
    return ['all'].concat(tags);
}

module.exports = resourceTags;
