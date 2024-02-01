'use strict';

/** @param {import("@11ty/eleventy/src/TemplateCollection")} api */
function blogTags(api) {
    let tags = [];
    let posts = api.getFilteredByGlob('./website/content/blog/*.md');

    posts.forEach((post) => {
        if(post.data.tags) {
            tags.push(...post.data.tags);
        }
    });

    tags = tags.filter((value, index) => tags.indexOf(value) === index).sort();
    return ['all'].concat(tags);
}

module.exports = blogTags;
