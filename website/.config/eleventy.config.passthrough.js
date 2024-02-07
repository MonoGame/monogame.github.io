'use strict'

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
    config.addPassthroughCopy({ ".website/static": "/" });
    config.addPassthroughCopy('./website/content/articles/**/*.{png, jpg, jpeg}');
    config.addPassthroughCopy('./website/content/blog/**/*.{png, jpg, jpeg}');
    config.addPassthroughCopy({ "./website/content/public/images": "/images" });
    config.addPassthroughCopy({ "./website/content/static/**/*": "/"});
    config.addPassthroughCopy({ "./website/content/public/js/**/*.js": "/js" });
    config.addPassthroughCopy({
        "node_modules/bootstrap-icons/font/fonts": "/fonts"
    });
    config.addPassthroughCopy({
        "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js": "/js/bootstrap.bundle.min.js"
    });
}
