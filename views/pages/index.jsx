var React = require('react');

var LayoutFactory = require('../layouts/default');
var HelloFactory = require('../components/hello');

module.exports = function(app) {
  var Layout = LayoutFactory(app);
  var Hello = HelloFactory(app);

  var mixins = app.getMixins('base/pages/index');

  var Index = React.createClass({
    mixins: mixins,

    componentWillMount: function() {
      this.props.children = this.props.children || [];

      this.props.children.push(
        <Hello {...this.props} key='indexpage-hello' />
      );
    },

    render: function() {
      return (
        <Layout {...this.props}>
          { this.props.children }
        </Layout>
      );
    }
  });

  return Index;
}
