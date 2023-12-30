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


// 'use strict';

// ////////////////////////////////////////////////////////////////////////////////
// /// Configure Ignores
// /// Configures all files to be ignored and not processed by 11ty during builds
// /// https://www.11ty.dev/docs/ignores/
// ////////////////////////////////////////////////////////////////////////////////
// function configureIgnores(config) {
//     config.setUseGitIgnore(false);

//     //  CSS is bundled using hte /src/assets/styles/_bundle.njk template
//     config.ignores.add('./src/assets/styles/**/*.css');

//     //  JS is bundled using hte /src/assets/scripts/_bundle.njk template
//     config.ignores.add('./src/assets/scripts/**/*.js');
// }

// ////////////////////////////////////////////////////////////////////////////////
// /// Configure Watch targets
// /// Configures targets to watch for changes when developing using 'npm run dev'
// /// that will trigger a new build when the file changes and is then saved.
// /// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets
// ////////////////////////////////////////////////////////////////////////////////
// function configureWatchTargets(config) {
//     config.addWatchTarget('./src/assets/styles/**/*.css');
//     config.addWatchTarget('./src/assets/scripts/**/*.js');
// }

// ////////////////////////////////////////////////////////////////////////////////
// /// Configure Filters
// /// Configures the filters that can be used within templates
// /// https://www.11ty.dev/docs/filters/
// ////////////////////////////////////////////////////////////////////////////////
// function configureFilters(config) {
//     config.addFilter('dateMed', require('./src/_11ty/filters/date.js'));
//     config.addFilter('toTableOfContents', require('./src/_11ty/filters/toTableOfContents.js'));
// }

// ////////////////////////////////////////////////////////////////////////////////
// /// Configure Data Extensions
// /// Configures additional file formats that can be used as data files
// /// https://www.11ty.dev/docs/data-custom/
// ////////////////////////////////////////////////////////////////////////////////
// function configureDataExtensions(config) {
//     config.addDataExtension('yml', require('./src/_11ty/data-extensions/yml.js'));
// }

// ////////////////////////////////////////////////////////////////////////////////
// /// Configure Collections
// /// Configures data collections that can be accessed on pages.
// /// https://www.11ty.dev/docs/collections/
// ////////////////////////////////////////////////////////////////////////////////
// function configureCollections(config) {
//     config.addCollection('blogPosts', require('./src/_11ty/collections/blogPosts.js'));
//     config.addCollection('blogTags', require('./src/_11ty/collections/blogTags.js'));
//     config.addCollection('gameTags', require('./src/_11ty/collections/gameTags.js'));
//     config.addCollection('articlesToc', require('./src/_11ty/collections/articlesToc.js'));
//     config.addCollection('apiToc', require('./src/_11ty/collections/apiToc.js'));
// }

// ////////////////////////////////////////////////////////////////////////////////
// /// Configure Plugins
// /// Configures plugins that are used by this 11ty instance
// /// https://www.11ty.dev/docs/plugins/
// ////////////////////////////////////////////////////////////////////////////////
// function configurePlugins(config) {
//     config.addPlugin(require('@11ty/eleventy-navigation'));
//     config.addPlugin(require('eleventy-plugin-nesting-toc'), {
//         tags: ['h2', 'h3'],
//         wrapper: 'nav',
//         wrapperClass: 'nav flex-column',
//         headingText: 'In This Article',
//         headingTag: 'h5'
//     });
//     config.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'));
// }

// ////////////////////////////////////////////////////////////////////////////////
// /// Configure Libraries
// /// Configures libraries used for file type rendering
// /// Example: https://www.11ty.dev/docs/languages/markdown/
// ////////////////////////////////////////////////////////////////////////////////
// function configureLibraries(config) {
//     config.setLibrary('md', require('./src/_11ty/libraries/markdown.js')(config));
// }

// ////////////////////////////////////////////////////////////////////////////////
// /// Configure Pass Through Copy
// /// Configures files that are copied from their src location to a destination
// /// location in the build directory without any other processing
// /// https://www.11ty.dev/docs/copy/
// ////////////////////////////////////////////////////////////////////////////////
// function configurePassThroughCopies(config) {
//     config.addPassthroughCopy({ "src/static": "/" });
//     config.addPassthroughCopy("src/articles/**/*.{png, jpg, jpeg}");
//     config.addPassthroughCopy({ "src/assets/images": "/images" });
//     config.addPassthroughCopy({ "src/assets/scripts": "/scripts" });
//     config.addPassthroughCopy({
//         "node_modules/bootstrap-icons/font/fonts": "/fonts",
//     });
//     config.addPassthroughCopy({
//         "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js":
//             "/scripts/bootstrap.bundle.min.js",
//     });
// }

// async function configureTransforms(config) {
//     const xref = require('./src/_11ty/transforms/replaceXref.js');
//     config.addTransform('replaceXrefTags',  xref);
// }

// module.exports = function(eleventyConfig) {
//     configureIgnores(eleventyConfig);
//     configureWatchTargets(eleventyConfig);
//     configureFilters(eleventyConfig);
//     configureDataExtensions(eleventyConfig);
//     configureCollections(eleventyConfig);
//     configurePlugins(eleventyConfig);
//     configureLibraries(eleventyConfig);
//     configureTransforms(eleventyConfig);
//     configurePassThroughCopies(eleventyConfig);

//     return require("./src/_11ty/config.json");
// };
