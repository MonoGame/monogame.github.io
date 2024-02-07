/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function(config) {
    config.setUseGitIgnore(false);
    config.ignores.add('./public/css/**/*.css');
    config.ignores.add('./public/js/**/*.js');
}
