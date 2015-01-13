var React = require('react');
var assign = require('object-assign');

var DEFAULT_OPTIONS = {
    engine: {
        doctype: '<!DOCTYPE html>',
        staticOutput: false
    },
    to5: {
        extensions: ['.jsx']
    }
};

function createEngine(opts) {
    opts = opts || {};
    var engineOptions = assign({}, DEFAULT_OPTIONS.engine, opts.engine);
    var to5Options = assign({}, DEFAULT_OPTIONS.to5, opts.to5);

    require('6to5/register')(to5Options);

    return function (filename, params, cb) {

        var importedComponent = require(filename);
        importedComponent = importedComponent.default || importedComponent;

        var reactFactory = React.createFactory(importedComponent);

        var markup = engineOptions.doctype;
        if (engineOptions.staticOutput) {
            markup += React.renderToStaticMarkup(reactFactory(params));
        } else {
            markup += React.renderToString(reactFactory(params));
        }

        cb(null, markup);

    };
}

exports.createEngine = createEngine;
