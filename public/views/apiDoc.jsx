React = require("react");
Copy = require("react-zeroclipboard");

//				<Copy richText={"curl -H 'X-Auth-Token:' " + this.props.token + "http://battle-api.com/auth"}>
var ApiDoc = React.createClass({
	
  getInitialState: function() {
    return {};
  },
  render: function(){
		var _this = this;
    return (
			<div className="api-section">
			  <h2>{this.props.doc.name}</h2>
			  <div className="api-box">{this.props.doc.example}</div>
				<div className="api-description">
					{this.props.doc.description}
				</div>
				<Copy getText={ function() {
											 
											 var string = 'curl -H "x-access-token: ' + _this.props.token + '" http://localhost:808/api/users/' + _this.props.userId + '/games/comp_vs_comp';
										   return string;
										 }
									 }>
				  <button>Copy</button>	
				</Copy>
			</div>
		);
  }
});

module.exports = ApiDoc;
