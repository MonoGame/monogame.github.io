'use strict';

const fs = require('fs');
const yaml = require('js-yaml');

/** @param {import("@11ty/eleventy/src/TemplateCollection")} api */
function articlesToc(api) {
    try {
        const data = fs.readFileSync('./content/articles/toc.yml', 'utf-8');
        return yaml.load(data);
    } catch(err) {
        console.error(err);
        return [];
    }
}

module.exports = articlesToc;
