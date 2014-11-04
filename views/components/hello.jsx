var React = require('react');

module.exports = function(app) {
  var mixins = app.getMixins('base/components/hello');

  var Hello = React.createClass({
    mixins: mixins,

    render: function() {
      return (
        <div>Hello {this.props.name}</div>
      );
    }
  });

  // wrap it with createFactory for react 0.12x compat
  return Hello;
}
