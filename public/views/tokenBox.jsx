React = require('react');
ReactClipboard = require('react-zeroclipboard');

var TokenBox = React.createClass( {
  componentDidMount: function(){
  },
  render: function(){
    return(
      <div className={"auth-box"}>
        Here is your token:<br/><br/>
        <div className="token">{this.props.token}</div>
        <div className="userId">{this.props.userId}</div>	
      </div>
    );
  }
});

module.exports = TokenBox;
