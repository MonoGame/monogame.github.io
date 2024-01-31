"use strict";

const fs = require("fs");
const path = require("path");
const debug = require("debug")("link-checker");
const cheerio = require("cheerio");
const axios = require("axios");

/**
 * Checks whether a given href is an internal link.
 *
 * @param {string} href - The href to be checked.
 * @returns {boolean} - True if the href is internal, false otherwise.
 */
function isInternalHref(href) {
    return !href.startsWith("http://") && !href.startsWith("https://");
}

/**
 * Checks whether a given href is an external link.
 *
 * @param {string} href - The href to be checked.
 * @returns {boolean} - True if the href is external, false otherwise.
 */
function isExternalHref(href) {
    return !isInternalHref(href);
}

/**
 * Formats hrefs, making them consistent and handling special cases.
 *
 * @param {string} href - The href to be formatted.
 * @returns {string} - The formatted href.
 */
function formatHref(href) {
    //  Internal hrefs end with '/' which points to an '/index.html' file, so we need
    //  to format the local hrefs to include the 'index.html' where appropriate.
    if (isInternalHref(href) && href.indexOf("index.html") < 0) {
        //  Convert all '/' and '\' in the href to path.sep to make it easier to
        //  check based on operating system.
        href = href.replace(/[\\/]/g, path.sep);

        //  Check if the last character is the path separator. This is how 11ty
        //  generates urls (pretty urls).  If it is, we'll need to append the
        //  'index.html' to the end for the full file path.
        if (href.split("").pop() === path.sep) {
            href += "index.html";
        }

        //  Check if the href contains an anchor.  if it does, we'll need to
        //  split it to add the 'index.html' and append the anchor after.
        else if (href.indexOf("#") >= 0) {
            // else if (href.indexOf(path.sep + '#') >= 0) {
            const index = href.indexOf("#");
            href =
                href.substring(0, index) + "index.html" + href.substring(index);
        }

        //  Check if the final character of the href is not the path separator.
        //  if not, append the path separator and 'index.html'
        else if (!href.endsWith(path.sep)) {
            href += path.sep + "index.html";
        }
    }

    const split = href.split("#");
    if (split.length === 2) {
        href = split[0] + "#" + decodeURIComponent(split[1]);
    }

    return href;
}

/**
 * Validates internal links against existing internal pages.
 *
 * @param {Map<string, string>} internalLinks - Map of internal links.
 * @param {Set<string>} internalPages - Set of internal pages.
 * @param {Array<Object>} errors - Array to store validation errors.
 */
async function validateInternalLinks(internalLinks, internalPages, errors) {
    internalLinks.forEach((sourcePage, link) => {
        if (!internalPages.has(link)) {
            errors.push({
                type: "page",
                target: link,
                source: sourcePage,
                reason: "page not found",
            });
        }
    });
}

/**
 * Validates internal anchored links against existing anchors in internal pages.
 *
 * @param {Map<string, string>} internalAnchoredLinks - Map of internal anchored links.
 * @param {Map<string, Set<string>>} internalAnchors - Map of internal anchors.
 * @param {Array<Object>} errors - Array to store validation errors.
 */
async function validateInternalAnchoredLinks(
    internalAnchoredLinks,
    internalAnchors,
    errors
) {
    internalAnchoredLinks.forEach((sourcePage, link) => {
        if (link.indexOf("platform-profile") >= 0) {
            console.log('here');
        }
        const index = link.indexOf("#");
        const page = link.substring(0, index) || sourcePage;
        const anchor = link.substring(index + 1);
        const entry = internalAnchors.get(page) || new Set();
        if (!entry.has(anchor)) {
            errors.push({
                type: "anchor",
                target: page + "#" + anchor,
                anchor: anchor,
                source: sourcePage,
                reason: "anchor not found",
            });
        }
    });
}

/**
 * Validates internal parent links against existing pages in the specified directory.
 *
 * @param {string} directory - The directory path to validate against.
 * @param {Map<string, string>} internalParentLinks - Map of internal parent links.
 * @param {Array<Object>} errors - Array to store validation errors.
 */
async function validateInternalParentLinks(
    directory,
    internalParentLinks,
    errors
) {
    const targets = Array.from(internalParentLinks.keys());

    await Promise.all(
        targets.map((target) => {
            return new Promise((resolve) => {
                fs.exists(path.resolve(directory, target), (result) => {
                    resolve(result);
                });
            });
        })
    ).then((results) => {
        results.forEach((result, index) => {
            const target = targets[index];
            const source = internalParentLinks.get(target);
            if (!result) {
                errors.push({
                    type: "page",
                    target: target,
                    source: source,
                    reason: "page not found",
                });
            }
        });
    });
}

/**
 * Validates internal parent anchored links against existing pages and anchors.
 *
 * @param {string} directory - The directory path to validate against.
 * @param {Map<string, string>} internalParentAnchoredLinks - Map of internal parent anchored links.
 * @param {Array<Object>} errors - Array to store validation errors.
 */
async function validateInternalParentAnchoredLinks(
    directory,
    internalParentAnchoredLinks,
    errors
) {
    const targets = Array.from(internalParentAnchoredLinks.keys());

    await Promise.all(
        targets.map((target) => {
            return new Promise((resolve, reject) => {
                const filePath = target.split("#")[0];
                const absolutePath = path.resolve(directory, filePath);
                fs.readFile(absolutePath, "utf-8", resolve);
            });
        })
    ).then((results) => {
        results.forEach((result, index) => {
            const target = targets[index];
            const source = internalParentAnchoredLinks.get(target);
            if (result instanceof Error) {
                return errors.push({
                    type: "page",
                    target: target,
                    source: source,
                    reason: "page not found",
                });
            }

            if (!result) {
                errors.push({
                    type: "anchor",
                    target: target,
                    source: source,
                    reason: "anchor not found",
                });
            }
        });
    });
}

/**
 * Validates external links by making HEAD requests.
 *
 * @param {Map<string, string>} externalLinks - Map of external links.
 * @param {Array<Object>} errors - Array to store validation errors.
 */
async function validateExternalLinks(externalLinks, errors) {
    const targets = Array.from(externalLinks.keys());

    await Promise.all(
        targets.map((target) => {
            return axios.head(target, {
                validateStatus: (status) => {
                    return status !== 404;
                },
            });
        })
    )
        .then((responses) => {
            responses.forEach((response, index) => {
                if (!response || !response.statusCode || !response.statusCode >= 200 || !response.statusCode < 300) {
                    const error = response;
                    const target = targets[index];
                    const source = externalLinks.get(target);
                    errors.push({
                        type: "external-link",
                        target: target,
                        source: source,
                        reason: "could not fetch external page: " + error.toString() + " (Code: " + response.statusCode + ")",
                    });
                }
            });
        })
        .catch((error) => {
            console.log("An unexpected error has occurred");
            console.log(error.toString());
        });
}

/**
 * Performs link checking for a given directory and provides a callback with the results.
 *
 * @param {string} directory - The directory path to perform link checking.
 * @param {Function} callback - Callback function to receive the results.
 */
async function linkChecker(dir, results, runMode, outputMode, callback) {
    // const rootDir = path.resolve(process.cwd(), dir.output);
    const rootDir = process.cwd();

    const internalLinks = new Map();                //  Links to internal files, without a # anchor.
    const internalAnchoredLinks = new Map();        //  Links to internal files with a # anchor.
    const internalParentLinks = new Map();          //
    const internalParentAnchoredLinks = new Map();  //
    const externalLinks = new Map();                //  Links to external http(s) paths without a # anchor.
    const externalAnchoredLinks = new Map();        //  Links to external http(s) paths with a # anchor.
    const internalAnchors = new Map();              //  All # anchors for an internal file.
    const internalPages = new Set();

    results.forEach((entry) => {

        const filePath = path.resolve(rootDir, entry.outputPath);
        internalPages.add(filePath);

        const $ = cheerio.load(entry.content);

        //  Extract links from <a> tags.
        const aTags = $('body').find('a');
        aTags.each((index, element) => {
            let href = ($(element).attr('href') || '').trim();

            if (!href || href === '') { return; }           //  Ignore anchor tags with no href attribute.
            if (href === '#') { return; }                   //  Ignore hash only links.
            if (href === '.') { return; }                   //  Ignore self referential hrefs.
            if (href.startsWith('mailto:')) { return; }     //  Ignore mailto: links
            if (href.startsWith('javascript:')) { return; } //  Ignore javascript: executable hrefs.

            //  If the href is an external link, handle and return to continue
            //  iteration
            if (isExternalHref(href)) {
                if (href.indexOf('#') >= 0) {
                    externalAnchoredLinks.set(href, filePath);
                } else {
                    externalLinks.set(href, filePath);
                }
                return;
            }

            //  Otherwise it is assumed to be an internal link.
            if (href.indexOf("#foundation") >= 0) {
                console.log('here');
            }

            let absoluteHref;
            if (href.startsWith('#')) {
                absoluteHref = filePath + href;
            } else {
                const formattedHref = formatHref(href);
                absoluteHref = path.join(rootDir, dir.output, formattedHref);
            }

            if (absoluteHref.startsWith('..')) {
                if (href.indexOf('#') >= 0) {
                    internalParentAnchoredLinks.set(absoluteHref, filePath);
                } else {
                    internalParentLinks.set(absoluteHref, filePath);
                }
            } else if (href.indexOf('#') >= 0) {
                const absoluteAnchoredHref = href.indexOf('#') === 0 ? filePath + href : absoluteHref;
                internalAnchoredLinks.set(absoluteAnchoredHref, filePath);
            } else {
                internalLinks.set(absoluteHref, filePath);
            }
        });

        //  Extract anchors (id or name) attributes from file.
        const anchors = $('html').find('[id], [name]');
        anchors.each((index, element) => {
            const anchor = $(element).attr('id') || $(element).attr('name');
            if (anchor === 'runtime-use') {
                console.log('here');
            }
            const entry = internalAnchors.get(filePath) || new Set();
            entry.add(anchor);
            internalAnchors.set(filePath, entry);
        });
    });

    const errors = [];

    await validateInternalLinks(internalLinks, internalPages, errors);
    await validateInternalAnchoredLinks(internalAnchoredLinks, internalAnchors, errors);
    await validateInternalParentLinks(rootDir, internalParentLinks, errors);
    await validateInternalParentAnchoredLinks(rootDir, internalParentAnchoredLinks, errors);
    await validateExternalLinks(externalLinks, errors);

    callback({
        errors,
        internalLinks: internalLinks.size,
        internalAnchoredLinks: internalAnchoredLinks.size,
        internalParentLinks: internalParentLinks.size,
        internalParentAnchoredLinks: internalParentAnchoredLinks.size,
        externalLinks: externalLinks.size,
    });
}

/**
 * @typedef {Object} LinkCheckerResult
 * @property {Array<Object>} errors - Array of validation errors.
 * @property {number} internalLinks - Count of internal links.
 * @property {number} internalAnchoredLinks - Count of internal anchored links.
 * @property {number} internalParentLinks - Count of internal parent links.
 * @property {number} internalParentAnchoredLinks - Count of internal parent anchored links.
 * @property {number} externalLinks - Count of external links.
 */

/**
 * Exports the linkChecker function as the module's main export.
 *
 * @type {Function}
 * @param {string} directory - The directory path to perform link checking.
 * @param {Function} callback - Callback function to receive the results.
 * @returns {LinkCheckerResult} - Results of the link checking.
 */
module.exports = linkChecker;
