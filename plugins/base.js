var React = require('react');
var nodeJSX = require('node-jsx');
var q = require('q');

nodeJSX.install({
  extension: '.jsx'
});

var IndexPageFactory = require('../views/pages/index');

module.exports = function(app) {

  var routes = [
    {
      path: /^(\/)?$/,
      fn: function index(req, app) {
        var defer = q.defer();
        var IndexPage = React.createFactory(IndexPageFactory(app));

        var page = IndexPage({
          name: 'Snoo'
        });

        defer.resolve(React.renderToString(page));

        return defer.promise;
      }
    },

    {
      path: /^\/wut/,
      fn: function wut(req, app) {
        var defer = q.defer();

        defer.resolve('wut');
        return defer.promise;
      }
    }
  ];

  return {
    routes: routes,
  };
}