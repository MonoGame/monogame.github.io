'use strict'

const { exec } = require('child_process');
const path = require('path');

async function executDocFx(cwd, command, config) {
    console.log('Executing docfx....');
    return new Promise((resolve, reject) => {
        const childProcess = exec(`${command} ${config}`, { cwd: cwd });
        childProcess.stdout.on('data', (data) => {
            console.log(`[docfx]: ${data.trim()}`);
        });

        childProcess.on('exit', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(`[docfx] exited with code: ${code}`);
            }
        });

        childProcess.on('error', (error) => {
            reject(`[docfx] Error executing command: ${error.message}`);
        });

    });
}

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
    config.on('eleventy.before', async ({ dir, runMode, outputMode }) => {
        // Set the working directory to current process.cwd + 'documentation/'
        const cwd = path.join(process.cwd(), 'documentation');
        const command = 'dotnet docfx';
        let config = null;
        if (process.env.GENERATE_ARTICLES === "true" && process.env.GENERATE_API === "true") {
            config = 'docfx.all.json';
        } else if (process.env.GENERATE_ARTICLES === "true") {
            config = 'docfx.articles.json'
        } else if (process.env.GENERATE_API === "true") {
            config = 'docfx.api.json';
        }

        console.log(`GENERATE_ARTICLES: ${process.env.GENERATE_ARTICLES}`);
        console.log(`GENERATE_API: ${process.env.GENERATE_API}`);
        console.log(`DOCFX CONFIG: ${config}`);
        

        try {
            if (config !== null) {
                const output = await executDocFx(cwd, command, config);
            }
        } catch (error) {
            console.error(error);
        }
    })
}
