var React = require('react');
var nodeJSX = require('node-jsx');
var q = require('q');

nodeJSX.install({
  extension: '.jsx'
});

var FancyFactory = require('../views/components/fancy');

module.exports = function(app) {
  var Fancy = FancyFactory(app);

  var mixins = {
    'base/components/hello': [
      {
        componentWillMount: function() {
          this.props.children = (
            <Fancy>
              { this.props.children }
            </Fancy>
          );
        }
      }
    ]
  };

  return {
    mixins: mixins,
  };
}
