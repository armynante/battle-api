var React = require('react');
var Page = require('./page.jsx');


var Index = React.createClass({
  getInitialState: function() {
    return {windowHeight: null, window: null};
  },
  handleResize: function(e) {
      this.setState({windowHeight: e.srcElement.body.scrollTop});
  },
  componentDidMount: function() {
    window.addEventListener('scroll', this.handleResize);
  },
  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleResize);
  },
  render:function(){
    return (
        <Page {...this.props}>
          <div className="headerStyle" >
            <h1 className="logoText">Battle-API</h1>
              <img src="images/battleship.png" className="ship" style={{right:this.state.windowHeight + 'px'}} />
          </div>
        </Page>
      )
  }
});

module.exports = Index;
