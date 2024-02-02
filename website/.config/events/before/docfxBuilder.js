'use strict';

const { exec } = require('child_process');
const path = require('path');
const chalk = require('chalk');

async function docfxBuilder() {
    const cwd = path.join(process.cwd(), 'documentation');
    const command = 'dotnet docfx';

    //  Determine which docfx configuraion to use    
    let config = null;
    if (process.env.GENERATE_ARTICLES === 'true' && process.env.GENERATE_API === 'true') {
        config = 'docfx.all.json';
    } else if (process.env.GENERATE_ARTICLES === 'true') {
        config = 'docfx.articles.json';
    } else if (process.env.GENERATE_API === 'true') {
        config = 'docfx.api.json';
    }

    //  If no config specified then early exit here, no need to continue;
    if (config === null) { return; }

    try {
        //  Wrap in promise so that the docfx documentation build happens
        //  synchronously before the 11ty site build. Otherwise, 11ty would
        //  generate in parallel and the console output might say it's finished
        //  while the docfx is still processing.  Gets confusing...
        await new Promise((resolve, reject) => {
            const childProcess = exec(`${command} ${config}`, { cwd: cwd });

            //  Hook into the stdout and stderr of the docfx process and write it 
            //  back to  the console so we can see what's happening.
            childProcess.stdout.on('data', (data) => {
                console.log('[docfx]: ' + chalk.white(data.trim()));
            });

            childProcess.stderr.on('data', (data) => {
                console.log('[docfx]: ' + chalk.red(data.trim()));
            })

            //  When docfx finishes, if the exit code is 0, then the promise is resolved
            //  otherwise we reject and report the issue.
            childProcess.on('exit', (code) => {
                if (code === 0) { resolve(); }
                else { reject('[docfx]: ' + chalk.red(`exited with code: ${code}`)); }
            });

            //  If there is an error with runnin the docfx process, reject and report
            childProcess.on('error', (error) => {
                reject('[docfx]: ' + chalk.red(`Error executing command: ${error.message}`));
            });
        });
    } catch (error) {
        console.error('[11ty::docfxBuilder]: ' + chalk.red(error));
    }
}

module.exports = docfxBuilder;