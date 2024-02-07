/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
    config.addWatchTarget('./website/content/public/css/**/*.css');
    config.addWatchTarget('./website/content/public/js/**/*.js');
    config.addWatchTarget('./website/content/public/images/**/*');
    // ------------------------------------------------------------------------
    //  This line is important to allow watch hot reloading when documentation
    //  files are changed that are built through docfx.  However, it's
    //  important that we negate the .yml files as docfx generates these as
    //  a middle file between the API and final HTML generation.  If we watch
    //  yml files, then we'll create an infinite loop of docfx building then
    //  11ty building due to the change, which trigters docfx to build again
    //  and so on.
    //
    //  so basically, please do not change this line.
    // ------------------------------------------------------------------------
    config.addWatchTarget('./documentation/**/*');
    config.watchIgnores.add('./documentation/**/*.yml');
    config.watchIgnores.add('./documentation/**/*.manifest');

    // ------------------------------------------------------------------------
    //  Tells watch to delay 100ms after it detects a file change before it
    //  triggers a rebuild. This is to prevent multiple triggers in a row from
    //  docfx generation.
    // ------------------------------------------------------------------------
    config.setWatchThrottleWaitTime(100);
}
