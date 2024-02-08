/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function(config) {
    config.setUseGitIgnore(false);
    config.ignores.add('./website/public/css/**/*.css');
    config.ignores.add('./website/public/js/**/*.js');

    if(process.env.GENERATE_WEBSITE === false) {
        config.ignores.add('./website/**/*');
    }
}
