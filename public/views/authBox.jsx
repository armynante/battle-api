React = require('react');

var AuthBox = React.createClass( {
  render: function(){
    return(
      <div className={"auth-box"}>
        Here is your token:
        <p className="token">{this.props.token}</p>
        <p className="userId">{this.props.userId}</p>
      </div>
    );
  }
})

module.exports = AuthBox;
