var React = require('react');

module.exports = function(app) {
  var mixins = app.getMixins('hello-enhanced/components/fancy');

  var Fancy = React.createClass({
    mixins: mixins,

    render: function() {
      return (
        <h1>{this.props.children}</h1>
      );
    }
  });

  // wrap it with createFactory for react 0.12x compat
  return Fancy;
}
