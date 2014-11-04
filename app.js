var q = require('q');

function App () {
  this.routes = [];
  this.components = {};
  this.mixins = {};
}

App.prototype.route = function(req) {
  var defer = q.defer();
  var params;
  var fn;

  for(var r in this.routes) {
    params = this.routes[r].path.exec(req.path);
    fn = this.routes[r].fn;

    if (params) {
      fn(req, this).fail(function(){
        defer.reject.apply(this, arguments);
      }).then(function(){
        defer.resolve.apply(this, arguments);
      });

      return defer.promise;
    }
  };

  defer.reject(req);
  return defer.promise;
}

App.prototype.registerPlugin = function(plugin) {
  var plugin = plugin(this);

  if (plugin.routes) {
    plugin.routes.forEach((function(r) {
      this.registerRoute(r.path, r.fn.bind(this));
    }).bind(this));
  }

  if (plugin.mixins) {
    for (var c in plugin.mixins) {
      this.registerMixins(c, plugin.mixins[c]);
    }
  }
}

App.prototype.registerRoute = function(path, fn) {
  this.routes.push({
    path: path,
    fn: fn,
  });
}

App.prototype.registerMixins = function (componentName, mixins) {
  this.mixins[componentName] = this.mixins[componentName] || [];
  this.mixins[componentName] = this.mixins[componentName].concat(mixins);
}

App.prototype.getMixins = function (componentName) {
  return this.mixins[componentName] || [];
}

module.exports = App;
