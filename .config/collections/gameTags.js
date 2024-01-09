'use strict';

const games = require('../../_data/games.json');

/** @param {import("@11ty/eleventy/src/TemplateCollection")} api */
function gameTags(api) {
    let tags = [];

    games.forEach((game) => {
        if(game.tags) {
            tags.push(...game.tags);
        }
    });

    tags = tags.filter((value, index) => tags.indexOf(value) === index).sort();
    return ['all'].concat(tags);
}

module.exports = gameTags;
