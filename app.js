var q = require('q');
var mutate = require('./mutate').mutate;

function App () {
  this.routes = [];
  this.components = {};
  this.mutators = {};
}

App.prototype.route = function(req) {
  var defer = q.defer();
  var params;
  var fn;

  for(var r in this.routes) {
    params = this.routes[r].path.exec(req.path);
    fn = this.routes[r][req.method];

    if (params && fn) {
      fn(req, this).fail(function(){
        defer.reject.apply(this, arguments);
      }).then(function(){
        defer.resolve.apply(this, arguments);
      });
    } else {
      defer.reject.apply(this, arguments);
    }

    return defer.promise;
  };

  defer.reject(req);
  return defer.promise;
}

App.prototype.registerPlugin = function(plugin) {
  var plugin = plugin(this);

  if (plugin.routes) {
    plugin.routes.forEach(function(r) {
      this.registerRoute(r.path, r.fn.bind(this));
    }, this);
  }

  if (plugin.mutators) {
    for (var c in plugin.mutators) {
      this.registerMutators(c, plugin.mutators[c]);
    }
  }
}

App.prototype.registerRoute = function(path, fn) {
  this.routes.push({
    path: path,
    fn: fn,
  });
}

App.prototype.registerMutators = function (componentName, mutators) {
  this.mutators[componentName] = this.mutators[componentName] || [];
  this.mutators[componentName] = this.mutators[componentName].concat(mutators);
}

App.prototype.mutate = function(componentName, component) {
  var args = this.mutators[componentName];

  if (args && args.length) {
    args.splice(0, 0, component);
    return mutate.apply(component, args);
  }

  return component;
}

module.exports = App;
