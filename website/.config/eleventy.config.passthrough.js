'use strict'

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
    config.addPassthroughCopy({ "static": "/" });
    config.addPassthroughCopy('content/articles/**/*.{png, jpg, jpeg}');
    config.addPassthroughCopy('content/blog/**/*.{png, jpg, jpeg}');
    config.addPassthroughCopy({ "content/public/images": "/images" });
    config.addPassthroughCopy({ "content/static/**/*": "/"});
    config.addPassthroughCopy({ "content/public/js/**/*.js": "/js" });
    config.addPassthroughCopy({
        "node_modules/bootstrap-icons/font/fonts": "/fonts"
    });
    config.addPassthroughCopy({
        "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js": "/js/bootstrap.bundle.min.js"
    });
}
