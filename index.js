/* jshint node: true */
'use strict';

var path = require('path'),
  util = require('util'),
  extend = util._extend,
  mergeTrees = require('broccoli-merge-trees'),
  Funnel = require('broccoli-funnel');

var defaultOptions = {
  importBootstrapTheme: false,
  importBootstrapCSS: true,
  importBootstrapFont: true
};

module.exports = {
  name: 'ember-bootstrap',

  included: function included(app) {
	
    var app = this._findHost();
    var options = extend(defaultOptions, app.options['ember-bootstrap']);
    var bootstrapPath = path.join(app.bowerDirectory, 'bootstrap/dist');

    // Import css from bootstrap
    if (options.importBootstrapCSS) {
      app.import(path.join(bootstrapPath, 'css/bootstrap.css'));
      app.import(path.join(bootstrapPath, 'css/bootstrap.css.map'), {destDir: 'assets'});
    }

    if (options.importBootstrapTheme) {
      app.import(path.join(bootstrapPath, 'css/bootstrap-theme.css'));
      app.import(path.join(bootstrapPath, 'css/bootstrap-theme.css.map'), {destDir: 'assets'});
    }

    // Import glyphicons
    if (options.importBootstrapFont) {
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.eot'), {destDir: '/fonts'});
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.svg'), {destDir: '/fonts'});
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.ttf'), {destDir: '/fonts'});
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.woff'), {destDir: '/fonts'});
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.woff2'), {destDir: '/fonts'});
    }

    if (typeof FastBoot === 'undefined') {
      app.import('vendor/transition.js');
    }
  },

  treeForStyles: function treeForStyles(tree) {
    var styleTrees = [];
    return mergeTrees(styleTrees, { overwrite: true });
  },

  _findHost: function() {
    var current = this;
    var app;

    // Keep iterating upward until we don't have a grandparent.
    // Has to do this grandparent check because at some point we hit the project.
    do {
	  app = current.app || app;
    } while (current.parent.parent && (current = current.parent));

    return app;
  },

};
