'use strict'

const { exec } = require('child_process');
const path = require('path');

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
    config.on('eleventy.before', ({ dir, runMode, outputMode }) => {
        // Set the working directory to current process.cwd + 'documentation/'
        const cwd = path.join(process.cwd(), 'documentation');

        // Execute the `dotnet docfx` command
        exec('dotnet docfx', { cwd }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                return;
            }

            if (stderr) {
                console.error(`Command error: ${stderr}`);
                return;
            }

            console.log(`Command output: ${stdout}`);
        });
    })
}
