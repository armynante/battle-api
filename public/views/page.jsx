var React = require('react');

var bodyStyle = {
  height: '1200px'
};

var Page = React.createClass({
  render:function(){
    return(
      <html>
        <head>
          <title>{this.props.title}</title>
        </head>
        <body style={bodyStyle}>
          {this.props.children}
          <script src="/bundle.js"></script>
          <link rel="stylesheet" type="text/css" href="/styles.css"></link>
          <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css'></link>
        </body>
      </html>
    )
  }
})

module.exports = Page;
