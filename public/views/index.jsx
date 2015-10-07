var React = require('react');
var Page = require('./page.jsx')

var Index = React.createClass({
  render: function() {
    return (
      <page {...this.props}>
        <h1>{this.props.title}</h1>
      </page>
    )
  }
});

module.exports = Index;
