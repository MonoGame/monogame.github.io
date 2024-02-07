"use strict";

////////////////////////////////////////////////////////////////////////////////
/// The required number of consecutive markers that must appear for a block to
/// be recognized as an admonition block.
////////////////////////////////////////////////////////////////////////////////
const requiredMarkerCount = 3;

////////////////////////////////////////////////////////////////////////////////
/// The marker that identifies an admonition block
////////////////////////////////////////////////////////////////////////////////
const marker = ':';

////////////////////////////////////////////////////////////////////////////////
/// The valid types for an admonition block.
/// These are based on the alert types for bootstrap since we're using bootstrap
////////////////////////////////////////////////////////////////////////////////
const types = ['note','tip', 'info', 'warning', 'danger']
const typeToBootstrapMap = {
    'note': 'light',
    'tip': 'success',
    'info': 'info',
    'warning': 'warning',
    'danger': 'danger'
}

////////////////////////////////////////////////////////////////////////////////
/// Handles the rendering of the admonition tokens
////////////////////////////////////////////////////////////////////////////////
function render(tokens, idx, options, env, self) {
    const token = tokens[idx];

    switch (token.type) {
        case 'admonition_open':
            token.attrPush(['class', `alert alert-${token.info} admonition`]);
            break;
        case 'admonition_title_open':
            token.attrPush(['class', 'alert-heading admonition-title']);
    }

    return self.renderToken(tokens, idx, options, env, self);
}

////////////////////////////////////////////////////////////////////////////////
/// Defines the block rule for parsing and processing admonition blocks in
/// markdown.
///
/// Admonition blocks in markdown must begin with three : characters followed by
/// a space and then the admonition type.  An optional title can follow the
/// type.  The admonition block must then end with three : characters.
/// For example
///
/// ::: note Optional Title
/// This is a note admonition
/// :::
///
/// The above would be parsed and translated into the following HTML
///
/// <div class="admonition note">
///     <p class="admonition-title">Optional Title</p>
///     <p>This is a note admonition</p>
/// </div>
////////////////////////////////////////////////////////////////////////////////
function admonition(state, startLine, endLine, silent) {

    let type = '';
    let title = null;
    let pos = 0;
    let closeFound = false;

    let start = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];

    //  Exit early if the starting character is not the admonition marker
    if (state.src[start] !== marker) {
        return false;
    }

    //  increment position for each sequential admonition marker
    for (pos = start + 1; pos <= max; pos++) {
        if (state.src[pos] !== marker) {
            break;
        }
    }

    //  Validate that the exact required marker count was found
    const markerCount = pos - start;
    if (markerCount !== requiredMarkerCount) {
        return false;
    }

    //  Gets the ::: markup that defines an admonition block from the source
    const markup = state.src.slice(start, pos);

    //  The remainder of the should contain the required admonition type and
    //  the optional admonition title.  If no title is give, then the admonition
    //  type is set as the title by default
    const params = state.src.slice(pos, max);
    const arr = params.trim().split(' ', 1);
    type = arr[0];

    //  Validate that the type given is a valid type. Exit early if not
    if (!types.includes(type)) {
        return false;
    }

    title = arr.length > 0 ? params.substring(type.length + 2) : type;

    let nextLine = startLine;

    //  Iterate through all lines up until at maximum the endline to find the
    //  ::: that ends the admonition block.  This will break early if the
    //  admonition block end markers are found before reaching the endLine.
    while (true) {
        if (++nextLine >= endLine) {
            break;
        }

        start = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];

        if (start < max && state.sCount[nextLine] < state.blkIndent) {
            break;
        }

        if (state.src[start] !== marker) {
            continue;
        }

        if (state.sCount[nextLine] - state.blkIndent >= 4) {
            continue;
        }

        for (pos = start + 1; pos <= max; pos++) {
            if (state.src[pos] !== marker) {
                break;
            }
        }

        if ((pos - start) < markerCount) {
            continue;
        }

        pos = state.skipSpaces(pos - markerCount);
        closeFound = true;
        break;
    }

    //  Cache the parent type and line max
    const parent = state.parentType;
    const lineMax = state.lineMax;

    //  Create the admonition tokens
    state.parentType = "admonition";
    state.lineMax = nextLine;

    //  admonition_open
    let token = state.push("admonition_open", "div", 1);
    token.markup = markup;
    token.block = true;
    token.info = typeToBootstrapMap[type];
    token.map = [startLine, nextLine];

    //  admonition_title_open
    token = state.push("admonition_title_open", "h4", 1);
    token.markup = markup + " " + type;
    token.map = [startLine, nextLine];

    //  title text inside the admonition_title
    token = state.push("inline", "", 0);
    token.content = title;
    token.map = [startLine, state.line - 1];
    token.children = [];

    //  admonition_title_close
    token = state.push("admonition_title_close", "h4", -1);
    token.markup = markup + " " + type;

    //  tokenize the content of the admonition
    state.md.block.tokenize(state, startLine + 1, nextLine);

    //  admonition_close
    token = state.push("admonition_close", "div", -1);
    token.markup = state.src.slice(start, pos);
    token.block = true;

    //  restore the parent and line max
    state.parentType = parent;
    state.lineMax = lineMax;

    state.line = nextLine + (closeFound ? 1 : 0);
    return true;
}

////////////////////////////////////////////////////////////////////////////////
/// Adds the admonition parsing plugin to markdown-it
////////////////////////////////////////////////////////////////////////////////
function admonitionPlugin(md) {
    md.block.ruler.before("code", "admonition", admonition, {
        alt: ["paragraph", "reference", "blockquote", "list"]
    });
    md.renderer.rules["admonition_open"] = render;
    md.renderer.rules["admonition_title_open"] = render;
    md.renderer.rules["admonition_title_close"] = render;
    md.renderer.rules["admonition_close"] = render;
}

module.exports = admonitionPlugin;
