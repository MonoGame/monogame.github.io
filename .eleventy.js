'use strict';

const ignores = require('./.config/eleventy.config.ignores');
const watch = require('./.config/eleventy.config.watchtargets');
const filters = require('./.config/eleventy.config.filters');
const dataExtensions = require('./.config/eleventy.config.dataExtensions');
const collections = require('./.config/eleventy.config.collections');
const plugins = require('./.config/eleventy.config.plugins');
const libraries = require('./.config/eleventy.config.libraries');
const passThrough  = require('./.config/eleventy.config.passthrough');
const transforms = require('./.config/eleventy.config.transforms');

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
function eleventy(eleventyConfig) {
    ignores(eleventyConfig);
    watch(eleventyConfig);
    filters(eleventyConfig);
    dataExtensions(eleventyConfig);
    collections(eleventyConfig);
    plugins(eleventyConfig);
    libraries(eleventyConfig);
    passThrough(eleventyConfig);
    transforms(eleventyConfig);

    return {
        //  Which files Eleventy will process
        templateFormats: [
            'md',
            'njk',
            'html'
        ],

        //  Pre-process markdown files using njk
        markdownTemplateEngine: 'njk',

        //  Pre-process html files using njk
        htmlTemplateEngine: 'njk',

        //  Configure directories where eleventy looks for content
        "dir": {
            "input": "content",
            "includes": "../_includes",
            "data": "../_data",
            "output": "_site"
        }
    }
}

module.exports = eleventy;
