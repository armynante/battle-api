var React = require('react');

var Header = React.createClass({
  render:function(){
    return (
              <div className="headerStyle" >
                <h1 className="logoText" >Battle-API</h1>
                  <img src="images/battleship.png" className="ship" style={{right:this.state.windowHeight + 'px'}} />
              </div>
            )
  }
});

module.exports = Header;
