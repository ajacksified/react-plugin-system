var React = require('react');

module.exports = function(app) {
  var Layout = require('../layouts/default')(app);
  var Hello = require('../components/hello')(app);

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

