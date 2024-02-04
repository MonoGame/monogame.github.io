'use strict';

const { exec } = require('child_process');
const path = require('path');
const chalk = require('chalk');

async function docfx() {
    const cwd = path.join(process.cwd(), 'documentation');
    const command = 'dotnet tool restore && dotnet docfx';

    console.log();
    console.log('--------------------');
    console.log('DocFx Build');
    console.log('--------------------');
    console.log();

    //  Determine which docfx configuraion to use    
    let config = null;
    let mode = process.env.RUN_MODE.trim();
    if (mode === 'dev' || mode === 'build') {
        config = 'docfx.all.json';
        console.log(chalk.green('[✔] Generate Articles'));
        console.log(chalk.green('[✔] Generate Api Documentation'))
    } else if (mode === 'articles') {
        config = 'docfx.articles.json';
        console.log(chalk.green('[✔] Generate Articles'));
        console.log(chalk.red('[❌] Generate Api Documentation'))
    } else {
        console.log(chalk.red('[❌] Generate Articles'));
        console.log(chalk.red('[❌] Generate Api Documentation'))
        console.log(chalk.green('Skipping DocFx Build'));
        return;
    }

    console.log();

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
                console.log(data.trim());
            });

            childProcess.stderr.on('data', (data) => {
                console.log(data.trim());
            });

            //  When docfx finishes, if the exit code is 0, then the promise is resolved
            //  otherwise we reject and report the issue.
            childProcess.on('exit', (code) => {
                if (code === 0) { resolve(); }
                else { reject(`exited with code: ${code}`); }
            });

            //  If there is an error with runnin the docfx process, reject and report
            childProcess.on('error', (error) => {
                reject(`Error executing command: ${error.message}`);
            });
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = docfx;