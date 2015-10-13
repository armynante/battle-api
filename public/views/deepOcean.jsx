var React = require('react');
var TokenBox = require('./tokenBox.jsx');
var AuthBox = require('./authBox.jsx');

var DeepOcean = React.createClass({

  render:function(){
    return (
              <div className="deepOcean">
                <AuthBox></AuthBox>
              </div>
      )
  }
});

module.exports = DeepOcean;
