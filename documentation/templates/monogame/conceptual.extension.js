// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// const cheerio = require('cheerio');

/**
 * This method will be called at the start of exports.transform in conceptual.html.primary.js
 */
exports.preTransform = function (model) {
  return model;
}

/**
 * This method will be called at the end of exports.transform in conceptual.html.primary.js
 */
exports.postTransform = function (model) {
    model.title = model.title ?? getTitle(model);
    model.description = model.description ??  getDescription(model);
  return model;
}

function getTitle(model) {
    //  model.rawTitle is the full contents of the first <h1> tag on the page.
    //  So just remove the HTML tag info and take the innerText for the title.
    return model.rawTitle.replace(/<.*?>/g, '').trim();
}

function getDescription(model) {
    //  model.conceptual contains the conceptual generated HTML for the page.
    //  Locate the first p tag opening and the first </p> tag close after that
    //  then capture the substring using those indexes, then remove the HTML tag
    //  info to get the innerText as the description.
    const pOpen = model.conceptual.indexOf('<p');
    const pClose = model.conceptual.indexOf('</p>', pOpen);

    if(pOpen != -1 && pClose != -1) {
        const p = model.conceptual.substring(pOpen, pClose + 4);
        return p.replace(/<.*?>/g, '').trim();
    }

    return '';
}
