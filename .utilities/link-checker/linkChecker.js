"use strict";

const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const https = require("https");
const { URL } = require("url");

const alreadyChecked = new Set();
const isValid = new Set();
const errors = [];

function markLinkInFileInvalid(file, link, lineNumber) {
    errors.push({
        file: file,
        link: link,
        lineNumber: lineNumber,
    });
}

function validateFile(rootDir, file) {
    const absolutePath = path.join(rootDir, file);
    const html = fs.readFileSync(absolutePath, "utf-8");
    const $ = cheerio.load(html, { withStartIndices: true });
    const links = $("a");

    links.each((index, element) => {
        const start = $(element).get(0).startIndex;
        const lineNumber = html.substring(0, start).split("\n").length;
        const href = $(element).attr("href");

        //  Has this link already been validated?
        if (alreadyChecked.has(href)) {
            //  Was it valid?
            if (isValid.has(href)) {
                return;
            }

            //  Not valid, so store the info
            markLinkInFileInvalid(file, href, lineNumber);
        }

        //  Is this an external or internal link?
        const isExternal = href.startsWith("http");

        if (isExternal) {
            if (!href.startsWith("https")) {
                markLinkInFileInvalid(file, href, lineNumber);
            } else {
                const url = new URL(href);
                const req = https.request(url, (res) => {
                    if (res.statusCode === 404) {
                        markLinkInFileInvalid(file, href, lineNumber);
                    }
                });
            }
        } else {
            const linkPath = path.join(rootDir, href);

            if (linkPath.endsWith("/")) {
                linkPath += "index.html";
            }

            if (!fs.existsSync(linkPath)) {
                markLinkInFileInvalid(file, href, lineNumber);
            }
        }

        isValid.add(href);
        alreadyChecked.add(href);
    });
}

function linkChecker(rootDir) {
    const opts = { recursive: true };
    fs.readdirSync(rootDir, opts)
        .filter((file) => file.endsWith(".html"))
        .forEach((file) => validateFile(rootDir, file));

    if (errors.length > 0) {
        errors.forEach((err) => console.log(JSON.stringify(err)));
    }
}

module.exports = linkChecker;
