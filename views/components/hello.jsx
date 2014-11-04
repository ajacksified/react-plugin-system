var React = require('react');

module.exports = function(app) {
  var Hello = React.createClass({
    render: function() {
      return (
        <ul key='hello-name-list'>
          <li>{this.props.name}</li>
        </ul>
      );
    }
  });

  return app.mutate('base/components/hello', Hello);
}
