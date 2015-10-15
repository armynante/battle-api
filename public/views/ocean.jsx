
var React = require('react');
var TokenBox = require('./tokenBox.jsx');
var AuthBox = require('./authBox.jsx');
var ApiDoc = require('./apiDoc.jsx');

var docs =[
    {
        "name": "registration",
        "route": "/register",
        "description": "Creates a new user based on email and password params",
        "example": "$ curl -H \"Content-Type: application/json\" -X POST -d '{\"email\":\"<email>\",\"password\":\"<password>\"}' http://battle-api.com/register"
    },
	  {
        "name": "authorization",
        "route": "/auth",
        "description": "This allows the user to authorize their calls with an api token. This token should be placed in the header of all requests as an x-access-token",
        "example": "$ curl -H \"X-Auth-Token: <Token>\" http://battle-api.com/auth"
    },
	  {
        "name": "new game",
        "route": "/users/:user_id/games/comp_vs_comp",
        "description": "Sets up a new game where the computer with play against itself. Two boards will be generated randomly",
        "example": "$ curl -H \"X-Auth-Token: <Token>\" http://battle-api.com/api/users/:user_id/games/comp_vs_comp"
    }
];

var Ocean = React.createClass({
  getInitialState: function() {
    return {token:'',userId:''};
  },
	handelAjax: function(ajaxRes){
		this.setState({token:ajaxRes.token,userId:ajaxRes.userId});
  },
  render:function(){
		var _this = this;
    return (
              <div>
                <div className="ocean">
		              <img src="images/sub.png" className="sub" style={{left:this.props.windowHeight / 8+ 'vw'}} />
		              <AuthBox windowHeight={this.props.windowHeight} windowRef={this.props.windowRef} handelAjax={this.handelAjax}></AuthBox>
		            </div>
		            <div className="deepOcean">
		              <TokenBox userId={this.state.userId} token={this.state.token}></TokenBox>
		            </div>
		            <div className="api-ref">

									{ docs.map( function(doc,i) {
										  console.log(_this.state.userId);
									    return <ApiDoc token={_this.state.token} userId={_this.state.userId} doc={doc} key={i}></ApiDoc>;

									  })
									}
		           
                </div>
              </div>
	      
    );
   }
});

module.exports = Ocean;
