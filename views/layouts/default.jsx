var React = require('react');

module.exports = function(app) {
  var Default = React.createClass({
    render: function() {
      return (
        <html>
          <head><title>{this.props.title}</title></head>
          <body>{this.props.children}</body>
        </html>
      );
    }
  });

  return app.mutate('base/layouts/default', Default);
}
