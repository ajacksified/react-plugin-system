var express = require('express');

var nodeJSX = require('node-jsx');
nodeJSX.install({
  extension: '.jsx'
});

var config = {
  port: 3000,
  plugins: [
    './plugins/base',
    './plugins/hello-enhanced'
  ]
}

var server = express();
var App = require('./app');
var app = new App();

config.plugins.forEach(function(p){ 
  app.registerPlugin(require(p));
});

server.all('*', function(req, res) {
  app.route({
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.body,
  }).then(function(body) {
    res.status(200).send(body);
  }).fail(function(req, status) {
    res.status(status || 404).end();
  });
});

server.listen(config.port);
console.log('listening on ' + config.port);
