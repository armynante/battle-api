var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var morgan = require('morgan');


//APP SETTUP
var port = '8080';
var private_ip = '10.132.125.55';
var logger = morgan('combined')
var enviorment = process.env.CURRENT_ENV;
var app        = express();


//MODELS
var User       = require('./models/user');

if (enviorment == 'production') mongoose.connect('mongodb://10.132.126.169/battle-api');
if (enviorment == 'development') mongoose.connect('mongodb://localhost/battle-api');


// ADD MIDDLEWARE
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.route('/users')
    .post(function(req, res) {
        var user = new User();
        user.name = req.body.name;

        user.save(function(err) {
            if (err) res.send(err);

            res.json({ message: 'User created!!' });
        })
    })
    .get(function(req,res) {
        User.find(function(err,users) {
          if(err) req.send(err);
          res.send(users);
        })
      });

router.route('/game')
    .post(function(req, res) {
        var user = new Game();
        var gameId = Math.floor(Math.random() * 1000000000);
        user.gamenumber = gameId;

        user.save(function(err) {
            if (err) res.send(err);

            res.json({ message: 'New game created!' });
        })
    })
    .get(function(req,res) {
        Game.find(function(err,games) {
          if(err) req.send(err);
          res.send(games);
        })
      });


// REGISTER OUR ROUTES ---------------------------------------------------------
// all of our routes will be prefixed with /api
app.use('/api',router);

// START THE SERVER
// =============================================================================
if (enviorment == 'production') app.listen(port, private_ip);
if (enviorment == 'development') app.listen(port);
console.log('Server started on port ' + port);
