
function replaceXrefTags(content) {
    const xrefRegex = /<xref\s+href="([^"]+)"[^>]*><\/xref>/g;
    return content.replace(xrefRegex, (match, hrefAttribute) => {
        const parts = hrefAttribute.split('.');
        const linkText = parts[parts.length - 1];

        return `<a href="${hrefAttribute}">${linkText}</a>`;
    });
}

module.exports = replaceXrefTags;
