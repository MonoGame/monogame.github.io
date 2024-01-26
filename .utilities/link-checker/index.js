'use strict'
const linkChecker = require('./linkChecker');
const path = require('path');
const fs = require('fs');

const rootDir = path.join(process.cwd(), '_site', path.sep)
if(fs.existsSync(rootDir)) {
    linkChecker(rootDir);
} else {
    console.log(`Unable to find site directory at ${rootDir}.  Did you forget to build the site first?`);
}
