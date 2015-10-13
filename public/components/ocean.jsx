var React = require('react');

var Ocean = React.createClass({

  render:function(){
    return (
        <Page {...this.props}>
          <div className="ocean" >
              <img src="images/battleship.png" className="sub" style={{right:this.props.windowHeight + 'px'}} />
          </div>
        </Page>
      )
  }
});

module.exports = Index;
