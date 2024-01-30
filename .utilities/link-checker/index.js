'use strict'
const linkChecker = require('./linkChecker');
const path = require('path');

//-----------------------------------------------------------------------------
//  Root Directory is set based on the current working directory as this is
//  expected to only be run in GitHub Actions CI environment to prevent build
//  on errors.
//
//  When running locally, ensure that your current working directory in your
//  terminal is the project root directory.
//-----------------------------------------------------------------------------
const rootDir = path.join(process.cwd(), '_site', path.sep)

linkChecker(rootDir, function (result) {
    //  Log errors to console.
    result.errors.forEach(error => {
        console.error(`${error.reason} from ${error.source} to ${error.target}`)
    })

    //  Log statistics to console
    console.log('')
    console.log('Stats:');
    console.log(`  Internal Links: ${result.internalLinks}`);
    console.log(`  Internal Anchored Links: ${result.internalAnchoredLinks}`);
    console.log(`  Internal Parent Links: ${result.internalParentLinks}`);
    console.log(`  Internal Parent Anchored Links: ${result.internalParentAnchoredLinks}`);
    console.log(`  External Links: ${result.externalLinks}`);
    console.log(`  Error Count: ${result.errors.length}`);

    //  Use the number of errors as the exit code. Anything other than 0 should tell the
    //  CI environment that the build cannot continue.
    process.exit(result.errors.length);
});
