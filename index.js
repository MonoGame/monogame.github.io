'use strict'

const { exec } = require('child_process');

function run() {
    const childProcess = exec('npx @11ty/eleventy --serve --config="./website/.eleventy.js', { env: process.env });
    childProcess.stdout.on('data', (data) => console.log(data.trim()));
    childProcess.stderr.on('data', (data) => console.error(data.trim()));
    childProcess.on('exit', (code) => console.log(`Process exited with code ${code}`));

}

const args = process.argv.slice(2);

if (args.length > 0) {
    process.env.GENERATE_WEBSITE = args.includes('--website');
    process.env.GENERATE_ARTICLES = args.includes('--articles');
    process.env.GENERATE_API = args.includes('--api');
} else {
    process.env.GENERATE_WEBSITE = true;
    process.env.GENERATE_ARTICLES = true;
    process.env.GENERATE_API = true;
}

run();