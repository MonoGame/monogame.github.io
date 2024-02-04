'use strict';

const fs = require('fs');
const path = require('path');

function sitemap(files, rootDir) {
    const site = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'website/_data/site.json'), 'utf-8'));
    const nodes = [];
    files.forEach((file) => {
        const loc = `${site.hostname}/${file.replace(/\\/g, '/')}`;
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const lastmod = `${year}-${month}-${day}`
        nodes.push(`\t<url>\n\t\t<loc>${loc}</loc>\n\t\t<lastmod>${lastmod}</lastmod>\n\t</url>\n`);
    });
    const xml =
        `<?xml version="1.0" encodeing="utf-8"?>\n\
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n\
        ${nodes.join('')}\
        </urlset>`;
    fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), xml, 'utf-8');
}

module.exports = sitemap;