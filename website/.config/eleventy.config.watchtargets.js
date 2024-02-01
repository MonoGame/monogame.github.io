/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function(config) {
    config.addWatchTarget('./website/content/public/css/**/*.css');
    config.addWatchTarget('./website/content/public/js/**/*.js');
    config.addWatchTarget('./website/content/public/images/**/*');
    config.addWatchTarget('./documentation/**/*');
}
