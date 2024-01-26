'use strict';

const redirects = new Set();

/** @param {import("@11ty/eleventy/src/TemplateCollection")} api */
function redirect(api) {
    //  Add any manual redirects needed in the future here manually
    //  Example:
    //      redirects.add({from: "old/path", to: "new/path"});

    //--------------------------------------------------------------------------
    //  Warning:
    //
    //  Do not edit below unless you are aware of what you are doing.
    //  The following is an automation that creates redirects for all article
    //  files since the URLs have changed on them once we moved to 11ty.
    //
    //  For example
    // '/articles/packaging_games.html' changed to '/articles/packaging_game/'
    //
    //--------------------------------------------------------------------------
    api.getFilteredByGlob('./content/articles/**/*.md')
       .forEach( (article) => {
        let path = article.page.url;
        let from = path.slice(0, -1) + '.html'
        redirects.add({from: from, to: path});
       });

    return Array.from(redirects);
}

module.exports = redirect;
