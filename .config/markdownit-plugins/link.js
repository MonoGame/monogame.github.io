////////////////////////////////////////////////////////////////////////////////
/// MIT License
/// 
/// Copyright (c) 2020 Jean-David Moisan
/// 
/// Permission is hereby granted, free of charge, to any person obtaining a copy
/// of this software and associated documentation files (the "Software"), to deal
/// in the Software without restriction, including without limitation the rights
/// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
/// copies of the Software, and to permit persons to whom the Software is
/// furnished to do so, subject to the following conditions:
/// 
/// The above copyright notice and this permission notice shall be included in all
/// copies or substantial portions of the Software.
/// 
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
/// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
/// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
/// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
/// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
/// SOFTWARE.
////////////////////////////////////////////////////////////////////////////////

// markdown-it plugin for:
// 1. adding target="_blank" to external links
// 2. normalize internal links
const path = require('path')

module.exports = (md, opts) => {
    let eleventyConfig = opts.eleventyConfig

    md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const hrefIndex = token.attrIndex('href')
        if (hrefIndex >= 0) {
            const hrefAttr = token.attrs[hrefIndex]
            const url = hrefAttr[1]
            const isOutbound = /^(?:[a-z]+:)?\/\//.test(url)
            if (isOutbound) {
                token.attrSet('target', '_blank')
                token.attrSet('rel', 'noopener noreferrer')
            } else if (!url.startsWith('#') && !url.startsWith('mailto:')) {
                normalizeHref(hrefAttr, env, token, true)
            }
        }

        return self.renderToken(tokens, idx, options)
    }

    const defaultRender = md.renderer.rules.image
    md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const hrefIndex = token.attrIndex('src')
        if (hrefIndex >= 0) {
            const hrefAttr = token.attrs[hrefIndex]
            const url = hrefAttr[1]
            const isOutbound = /^(?:[a-z]+:)?\/\//.test(url)
            if (!isOutbound) {
                normalizeHref(hrefAttr, env, token, false)
            }
        }

        return defaultRender(tokens, idx, options, env, self)
    }

    function normalizeHref(hrefAttr, env, token, addAttr) {
        let url = hrefAttr[1]

        //  Old site style with DocFx linked to API documentation using the
        //  following markdown example
        //  [GraphicsDeviceManager](xref:Microsoft.Xna.Framework.GraphicsDeviceManager)
        //
        //  To allow documentation to continue to be written this way, the following
        //  checks for the `xref:` string at the start of the link and explicitly
        //  adjusts it for the `/api/` directory link.
        if(url.startsWith('xref:')) {
            url = '/api/' + url.slice(5);
        } else {

        const parsed = new URL(url, 'http://a.com')
        let cleanUrl = url.replace(/\#.*$/, '').replace(/\?.*$/, '')

        applyBase = true

        // Remove markdown extension.
        let isMarkdown = /(?:(readme))?.(md)$/i;
        if (isMarkdown.test(cleanUrl)) {
            cleanUrl = cleanUrl.replace(isMarkdown, "");
        }

        // Check if there's an extension.
        let hasExt = /\.([0-9a-z]+)(?:[\?#]|$)/i;
        if (!hasExt.test(cleanUrl)) {
            // Add trailing slash if missing.
            cleanUrl = cleanUrl.replace(/\/?(\?|#|$)/, '/$1');
        }

        let dir = path.dirname(env.page?.filePathStem ?? '');
        url = dir + '/' + cleanUrl + parsed.search + parsed.hash;
        url = decodeURI(url);

        if (applyBase) {
            url = eleventyConfig.getFilter("url")(url);
        }
    }

        hrefAttr[1] = url
    }
}
