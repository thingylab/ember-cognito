/* eslint-env node */
/* eslint-disable object-shorthand no-var */
'use strict';
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cognito',
  options: {
    nodeAssets: {
      'amazon-cognito-identity-js': function() {
        return {
          vendor: {
            enabled: process.env.EMBER_CLI_FASTBOOT !== 'true',
            include: [
              'dist/aws-cognito-sdk.js',
              'dist/amazon-cognito-identity.min.js',
              'dist/amazon-cognito-identity.min.js.map'
            ]
          }
        };
      }
    }
  },
  treeForAddon(tree) {
    var result = this._super.treeForAddon.apply(this, arguments);
    var cognito = new Funnel('node_modules/amazon-cognito-identity-js/src', {
      include: ['*.js'],
      destDir: 'amazon-cognito-identity-js'
    });
    var preprocessed = this.preprocessJs(cognito, '/', this.name, {
      registry: this.registry
    });
    return mergeTrees([preprocessed, result]);
  },

  included: function(app) {
    this._super.included.apply(this, arguments);
    app.import('vendor/amazon-cognito-identity-js/dist/aws-cognito-sdk.js');
    // app.import('vendor/amazon-cognito-identity-js/dist/amazon-cognito-identity.min.js');
    app.import('vendor/shims/aws-sdk.js');
  }
};
