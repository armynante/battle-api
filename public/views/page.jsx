var React = require('react');

var bodyStyle = {
  // height: '1200px'
};

var Page = React.createClass({

  render:function(){
    return(
      <html>
        <head>
          <title>{this.props.title}</title>
          <link rel="stylesheet" type="text/css" href="/styles.css"></link>
	  <link href='https://fonts.googleapis.com/css?family=Lato:400,100|Cutive+Mono' rel='stylesheet' type='text/css'/>
        </head>
        <body style={bodyStyle}>
          {this.props.children}
          <script src="/bundle.js"></script>
        </body>
      </html>
    );
  }
});

module.exports = Page;
