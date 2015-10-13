React = require('react');
var tweenState = require('react-tween-state');
var $ = require('jquery');

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

var AuthBox = React.createClass( {
  mixins: [tweenState.Mixin],
  getInitialState: function() {
    return {value: '', valid: false, focused: false, error: false, dirty: false, emailValid: false, passValid: false, windowHeight: 0, topval: 0, scrollOn: false};
  },
  setVal: function(event) {
    this.setState({value: event.target.value});
  },
  handleClick: function() {
    _this = this;
    this.setState({scrollOn: true});
    var height = this.state.screenHeight;
    this.tweenState('topval', {
          beginValue: this.props.windowHeight,
          easing: tweenState.easingTypes.easeInOutQuad,
          duration: 1000,
          endValue: this.props.windowRef.screen.height  + this.props.windowHeight,
          onEnd: function() {
              _this.setState({scrollOn: false});
          }
        });

  },
  testEmail: function(event) {
    this.setState({dirty: true });
    var val = event.target.value;
    var valid = validateEmail(val);
    this.setState({email: event.target.value, error: !valid, emailValid: valid, errorMsg:"Email is not valid."});
  },
  testPass: function(event) {
    var val = event.target.value;
    var valid = val.length > 7;
    this.setState({pass: event.target.value, error: !valid, passValid: valid, errorMsg: "Passord needs to be at least 8 charachters long."});
  },
  getToken: function() {
    _this = this;
    $.ajax({
      url: '/api/register',
      method: 'POST',
      data: { email: this.state.email, password: this.state.pass},
      dataType: 'json',
      success: function(data) {
        _this.setState({error: false, errorMsg:""});
        _this.props.handelAjax({token:data.token, userId:data.user_id});
        _this.handleClick();
      },
      error: function(err) {
        _this.setState({error: true, errorMsg:err.responseText});
      },
    });
  },
  render: function(){
    var value = this.state.value;
    if (this.props.windowRef && this.state.scrollOn ) {
      var val = this.getTweeningValue('topval')
      this.props.windowRef.scrollTo(0 ,val);
    }
    return(
      <div className={"focus-box"}>
            <div className={"errorholder" + (this.state.error ? " errorMsg" : " ") }>
                {this.state.errorMsg}
            </div>
            <div className={"emailholder" + (this.state.emailValid && this.state.dirty ? " valid" : " ") + (!this.state.emailValid && this.state.dirty ? " error" : " ")}>
                <input type={"text"} placeholder={"enter email"} onFocus={this.focus} onBlur={this.blur} onChange={this.testEmail} />
            </div>
            <div className={"passholder" + (this.state.passValid ? " valid" : " ") + (!this.state.passValid && this.state.dirty ? " error" : " ")}>
                <input type={"password"} placeholder={"enter password"} onFocus={this.focus} onBlur={this.blur} onChange={this.testPass} />
                <div className={"submitBtn" + (this.state.passValid && this.state.emailValid ? " valid" : " ")} onClick={this.getToken}>Submit</div>
            </div>
        </div>
    );
  }
})

module.exports = AuthBox;
