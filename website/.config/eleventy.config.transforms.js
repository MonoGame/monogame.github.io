'use strict'

const xref = require('./transforms/xref');

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
     config.addTransform('xref', function(content) {
        if(this.page.inputPath.includes('.md') && this.page.outputPath.endsWith('.html')) {
            return xref(content);
        }
        return content;
     });
}
