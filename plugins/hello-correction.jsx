var React = require('react');
var q = require('q');

var query = require('../mutate').query;

module.exports = function(app) {
  /**
  *  * take each Content child, wrap its current children in a <del> tag, then
  *   * add a <span.new-content> element with some new content.
    *    */
  var Correction = function() {
    query(this, 'li').forEach(function(element) {
      element.props.children = [
        ( <del>{ element.props.children }</del> ),
        ( <span className='new-content'>
          The Baz mutator replaces Content elements!
          </span> )
      ];
    });
  };

  var mutators = {
    'base/components/hello': [
      Correction,
    ]
  };

  return {
    mutators: mutators,
  };
}
