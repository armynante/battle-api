var React = require('react');
var TokenBox = require('./tokenBox.jsx');
var AuthBox = require('./authBox.jsx');

var Ocean = React.createClass({
  getInitialState: function() {
    return {token:'',userId:''};
  },
  handelAjax: function(ajaxRes){
    this.setState({token:ajaxRes.token,userId:ajaxRes.user_id});
  },
  render:function(){
    return (
              <div>
                 <div className="ocean">
		    <img src="images/sub.png" className="sub" style={{left:this.props.windowHeight / 8+ 'vw'}} />
		    <AuthBox windowHeight={this.props.windowHeight} windowRef={this.props.windowRef} handelAjax={this.handelAjax}></AuthBox>
		  </div>
		  <div className="deepOcean">
		    <TokenBox userId={this.state.userId} token={this.state.token}></TokenBox>
		  </div>		  
              </div>
	      
    );
   }
});

module.exports = Ocean;
