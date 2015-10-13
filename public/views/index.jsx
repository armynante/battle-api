var React = require('react');
var Page = require('./page.jsx');
var Ocean = require('./ocean.jsx');
var DeepOcean = require('./deepOcean.jsx');
var Header = require('./header.jsx');


var Index = React.createClass({
  getInitialState: function() {
    return {windowHeight: null, windowState: null, scrollState:null, token:"", userId:""};
  },
  handleResize: function(e) {
      this.setState({windowHeight: e.srcElement.body.scrollTop});
  },
  componentDidMount: function() {
    this.setState({windowState: window });
    window.addEventListener('scroll', this.handleResize);
  },
  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleResize);
  },
  render:function(){
    return (
        <Page>
          <div className="headerStyle" >
            <Header windowRef={this.state.windowState}></Header>
            <img src="images/battleship.png" className="ship" style={{right:this.state.windowHeight + 'px'}} />
          </div>
          <Ocean windowHeight={this.state.windowHeight} userId={this.state.userId} token={this.state.token} windowRef={this.state.windowState}>
          </Ocean>
          <DeepOcean windowHeight={this.state.windowHeight} userId={this.state.userId} token={this.state.token}></DeepOcean>
        </Page>
      )
  }
});

module.exports = Index;
