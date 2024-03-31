/**
 * This method will be called at the start of exports.transform in conceptual.html.primary.js
 */
exports.preTransform = function (model) {

    //  The model.conceptual property has all of the generated HTMl that's used
    //  by docfx for the article. For each HTML tag, there is a `sourcestartlinenumber`
    //  value that defines the line within the article that markdown was at.
    //  We'll need this to determine the values to inject for the title and
    //  description
    const lineNumber = getStartingLineNumber(model);

    //  Each HTMl tag also uses a `sourceFile` attribute which is just the path
    //  to the markdown file.
    const sourceFile = model.path

    //  If a `title` frontmatter is supplied, this will inject that as the first
    //  <H1> tag of the article.
    if (model.title) {
        const titleLineNumber = Math.max(0, lineNumber - 2);
        const id = slugify(model.title);
        model.rawTitle = `<h1 id="${id}" sourceFile="${sourceFile}" sourcestartlinenumber="${titleLineNumber}">${model.title}</h1>`;
    }

    //  If a `description` frontmatter is supplied, this will inject that as the
    //  first <p> tag of the article
    if (model.description) {
        const style = model.descriptionStyle ?? 'text-secondary';
        const pLineNumber = Math.max(0, lineNumber - 1);
        const p = `<p sourcefile="${sourceFile}" sourcestartlinenumber="${pLineNumber}" class="${style}">${model.description}</p>`
        model.conceptual = p + model.conceptual;
    }

    return model;
}

function getStartingLineNumber(model) {
    const start = model.conceptual.indexOf('sourcestartlinenumber="');
    const end = model.conceptual.indexOf('"', start);

    if (start != -1 && end != -1) {
        return model.conceptual.substring(start, end);
    }

    return 0;
}

function slugify(value) {
    return value.toLowerCase()      //  Lower case title
        .replace(/\s+/g, '-')       //  Replaces spaces with hyphens
        .replace(/[^\w\-]+/g, '')   //  Remove all non-word characters
        .replace(/\-\-+/g, '-')     //  Double hyphen to single hyphen
        .trim();                    //  Trim it up
}

/**
 * This method will be called at the end of exports.transform in conceptual.html.primary.js
 */
exports.postTransform = function (model) {
    return model;
}
