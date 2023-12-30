'use strict'

/** @param {import("@11ty/eleventy/src/TemplateCollection")} api */
function blogPosts(api) {
    return api.getFilteredByGlob('./content/blog/*.md').sort((a, b) => a.date - b.date);
}

module.exports = blogPosts;
