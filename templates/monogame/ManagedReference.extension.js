/**
 * This method will be called at the start of exports.transform in ManagedReference.html.primary.js
 */
exports.preTransform = function (model) {
    //  This only runs against documentation files generated for source code
    //  Since these do not automatically generate a _title meta data, one
    //  will be generated for them based on the name of the file, minus the
    //  extension.
    if(!model._title) {
        model._title = model._path.replace(/^.*[\\/]/, '')      //  Remove path
                                  .replace(/\.[^/.]+$/, '');    //  Remove extension
    }
    model.api = true;
    return model;
}