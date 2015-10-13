React = require('react');
var tweenState = require('react-tween-state');

var Header = React.createClass( {
  mixins: [tweenState.Mixin],
  getInitialState: function() {
    return {windowHeight: 0, topval:0, scrollOn: false};
  },
  handleClick: function() {
    _this = this;
    this.setState({scrollOn: true});
    this.tweenState('topval', {
          beginValue: 0,
          easing: tweenState.easingTypes.easeInOutQuad,
          duration: 1000,
          endValue: this.state.windowHeight * 1.5,
          onEnd: function() {
              _this.setState({scrollOn: false});
          }
        });

  },
  render: function(){
    if (this.props.windowRef) this.state.windowHeight = this.props.windowRef.screen.height;
    if (this.props.windowRef && this.state.scrollOn ) {
      var val = this.getTweeningValue('topval')
      this.props.windowRef.scrollTo(0,val);
    }
    return(
      <div>
      <h1 className="logoText">Battle-API</h1>
      <div className="about-box">
        <section className="headerText">
          <p>An api that you can play battle ship against.</p>
          <p>Use it to build a UI or test an algorithm.</p>
          <p>Signup below to get an auth token.</p>
        </section>
        <div className="btn-box">
          <a className="btn" onClick={this.handleClick} >Register</a>
        </div>
      </div>
    </div>
    );
  }
})

module.exports = Header;
