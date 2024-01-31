"use strict";

const linkChecker = require("./events/link-checker");

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
    config.on("eleventy.after", ({ dir, results, runMode, outputMode }) => {
        linkChecker(dir, results, runMode, outputMode, (result) => {
            result.errors.forEach((error) => console.log(error));
            //  Log statistics to console
            console.log('')
            console.log('Stats:');
            console.log(`  Internal Links: ${result.internalLinks}`);
            console.log(`  Internal Anchored Links: ${result.internalAnchoredLinks}`);
            console.log(`  Internal Parent Links: ${result.internalParentLinks}`);
            console.log(`  Internal Parent Anchored Links: ${result.internalParentAnchoredLinks}`);
            console.log(`  External Links: ${result.externalLinks}`);
            console.log(`  Error Count: ${result.errors.length}`);
        });
    });
};
