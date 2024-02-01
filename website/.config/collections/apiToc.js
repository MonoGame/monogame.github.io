'use strict';

const fs = require('fs');
const yaml = require('js-yaml');

function filterElementsWithoutHref(element) {
    if (!element || !element.hasOwnProperty('href')) {
        return true;
    }

    if (element.items) {
        element.items = element.items.filter((item) => !filterElementsWithoutHref(item));
    }

    return false;
}

function removeMDExtension(json) {
    json.forEach((element) => {
        if (element.href) {
            element.href = element.href.replace(/\.md$/, '');
        }

        if (element.items) {
            element.items.forEach((item) => {
                if (item.href) {
                    item.href = item.href.replace(/\.md$/, '');
                }
            });
            removeMDExtension(element.items);
        }
    });
}

function sortElements(elements) {
    elements.forEach((element) => {
        if (element.items) {
            element.items.sort((a, b) => a.name.localeCompare(b.name));
            sortElements(element.items);
        }
    });
}

/** @param {import("@11ty/eleventy/src/TemplateCollection")} api */
function apiToc(api) {
    try {
        const data = fs.readFileSync('./content/api/toc.yml', 'utf-8');
        let json = yaml.load(data);
        json = json.filter((element) => !filterElementsWithoutHref(element));
        removeMDExtension(json);
        sortElements(json);
        return json;
    } catch (err) {
        console.warn("'/content/api/toc.yml' is missing. API documentation will not be generated");
        console.warn("If you wanted to include API documentation in your local build run the following command");
        console.warn("npm run docfx");
        console.warn("Note: including API documentation in local builds may increase build times");
        return [];
    }
}

module.exports = apiToc;
