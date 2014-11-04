var React = require('react');

var LayoutFactory = require('../layouts/default');
var HelloFactory = require('../components/hello');

module.exports = function(app) {
  var Layout = LayoutFactory(app);
  var Hello = HelloFactory(app);

  var Index = React.createClass({
    render: function() {
      return (
        <Layout {...this.props}>
          <Hello {...this.props} key='indexpage-hello' />
        </Layout>
      );
    }
  });

  return app.mutate('base/pages/index', Index);
}

