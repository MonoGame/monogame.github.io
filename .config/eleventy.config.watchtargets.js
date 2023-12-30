/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function(config) {
    config.addWatchTarget('./content/public/css/**/*.css');
    config.addWatchTarget('./content/public/js/**/*.js');
    config.addWatchTarget('./content/public/images/**/*');
}
