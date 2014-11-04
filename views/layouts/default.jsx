var React = require('react');

module.exports = function(app) {
  var mixins = app.getMixins('base/components/hello');

  var Default = React.createClass({
    mixins: mixins,

    render: function() {
      return (
        <html>
          <head><title>{this.props.title}</title></head>
          <body>{this.props.children}</body>
        </html>
      );
    }
  });

  return Default;
}
