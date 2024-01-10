'use strict'

const mdAnchor = require('markdown-it-anchor');
const mdLink = require('./markdownit-plugins/link');
const mdAdmonitions = require('./markdownit-plugins/admonitions');

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
    config.amendLibrary('md', md => md.use(mdAnchor, {
        slugify: (s) => config.getFilter('slugify')(s.replace(/\d+/g, '')),
        permalink: mdAnchor.permalink.headerLink()
    }));

    //  Setup external links to open in new tab
    config.amendLibrary('md', md => md.use(mdLink, {eleventyConfig: config}));

    //  Setup admonition support 
    config.amendLibrary('md', md => md.use(mdAdmonitions));

    //  Setup tables to be formatted by default using bootstrap styling
    config.amendLibrary('md', md => md.use((m) => {
        m.renderer.rules.table_open = (tokens, id) => '<table class="table table-bordered table-condensed">';
    }));
}
