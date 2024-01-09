'use strict';

const cleanCss = require("clean-css");

function cssmin(css) {
    return new cleanCss({}).minify(css).styles;
}

module.exports = cssmin;
