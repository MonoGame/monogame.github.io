'use strict'

const blogPosts = require('./collections/blogPosts');
const blogTags = require('./collections/blogTags');
const gameTags = require('./collections/gameTags');
const resourceTags = require('./collections/resourceTags');


/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
    config.addCollection('blogPosts', blogPosts);
    config.addCollection('blogTags', blogTags);
    config.addCollection('gameTags', gameTags);
    config.addCollection('resourceTags', resourceTags);
}
