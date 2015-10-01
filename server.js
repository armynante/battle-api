var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

//User Models
var User       = require('./models/user');
mongoose.connect('mongodb://localhost/test');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8080;
var private_ip = 10.132.125.55;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res, next) {
    res.end("Hello, World!!!");
});

router.route('/users')
    .post(function(req, res) {
        var user = new User();
        user.name = req.body.name;

        user.save(function(err) {
            if (err) res.send(err);

            res.json({ message: 'User created!' });
        })
    })
    .get(function(req,res) {
        User.find(function(err,users) {
          if(err) req.send(err);
          res.send(users);
        })
      });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port,private_ip);
console.log('Server started on port ' + port);
