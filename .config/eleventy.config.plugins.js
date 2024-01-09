'use strict'
const navigation = require('@11ty/eleventy-navigation');
const syntaxhighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const nesting = require('eleventy-plugin-nesting-toc');
const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');


/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
    config.addPlugin(navigation);
    config.addPlugin(syntaxhighlight);
    config.addPlugin(nesting, {
        tags: ['h2', 'h3'],
        wrapper: 'nav',
        wrapperClass: 'nav flex-column',
        headingText: 'In This Article',
        headingTag: 'h5'
    });
    config.addPlugin(EleventyHtmlBasePlugin);
}
