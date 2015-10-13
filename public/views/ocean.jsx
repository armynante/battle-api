var React = require('react');
var TokenBox = require('./tokenBox.jsx');

var Ocean = React.createClass({

  render:function(){
    return (
              <div className="ocean">
                <img src="images/sub.png" className="sub" style={{left:this.props.windowHeight / 8+ 'vw'}} />
                <TokenBox windowHeight={this.props.windowHeight} windowRef={this.props.windowRef}></TokenBox>
              </div>
      )
  }
});

module.exports = Ocean;
