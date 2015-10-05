var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var morgan     = require('morgan');
var jwt        = require('jsonwebtoken');
var config     = require('./config.js');

//APP SETTUP
var port       = '8080';
var logger     = morgan('combined')
var app        = express();
var enviorment = process.env.CURRENT_ENV

//MODELS
var User                 = require('./models/user');
var Game                 = require('./models/game');
var Board                = require('./models/board');
var BoardModel           = require('./models/boardModel');
var PlayerModel          = require('./models/playerModel');
var GameModel            = require('./models/gameModel');
var FiringSolutionModel  = require('./models/FiringSolutionModel');

if (enviorment == 'production') mongoose.connect(config.production_database);
if (enviorment == 'development') mongoose.connect(config.development_database);


// ADD MIDDLEWARE
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.route('/resigter')
  .post(function(req, res) {
    User.save({email:req.body.email,password:req.body.password}, function(err,user) {
      if err throw error;
      res.json({success:true,user_id: user.id})
    });
  })
router.route('/auth')
  .post(function(req, res) {

    User.findOne({
      email: req.body.email
    }, function(err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      }

      else if (user) {

        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {

          var token = jwt.sign(user, config.secret, {
            expiresIn: config.token_expriration
          });

          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      }
    });
  });

router.use(function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {

    jwt.verify(token, config.secret, function(err, decoded) {

      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {

        req.decoded = decoded;
        next();
      }
    });

  } else {

    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});
router.route('/users/:user_id/games')

  .post(function(req, res) {
    User.findOne({
      _id: req.params.user_id
    }, function(err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'User not found.' });
      }

      else if (user) {
        var new_game = new Game();

        Board.random(function(err, board) {
          new_game.board = board.id;
          new_game.owner = user.id;

          new_game.ai.board = board.layout;

          new_game.save(function(err) {
            if (err) res.send(err);
            res.json({ message: 'New game created!', game_id: new_game.id  });
          })
        });
      }
    });
  })

  .get(function(req,res) {
    User.findOne({
      _id: req.params.user_id
    }, function(err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'User not found.' });
      }

      else if (user) {
        Game.find({
          owner: user.id
        }, function(err, games) {
          res.json({ success: true, games: games });
        });
      };
    });
  });

router.route('/games/:game_id/place_boat/:boat_type/:x_postition/:y_position/:orientation')
  .post(function(req, res) {

    Game.findOne({
      _id: req.params.game_id
    }, function(err, game) {

      if (err) throw err;

      if (!game) {
        res.json({ success: false, message: 'Game not found.' });
        return;
      }

      else if (game) {

        var board = new BoardModel();

        //derserialize the state
        board.state = JSON.parse(game.player.board);
        playerState = JSON.parse(game.player.shipState);

        for (var i = 0; i < playerState.length; i++) {

          var state = playerState[i]

          if (state.type === req.params.boat_type && state.placed === 0) {
            res.json({ success: false, message: 'Boat already placed' });
            return;
          }

          if (state.type === req.params.boat_type && state.placed === 1) {

            playerState[i].placed = 0;
          }
        }


        var validPlacement = board.placeBoat(req.params.boat_type,
                                             req.params.orientation,
                                             parseInt(req.params.y_position),
                                             parseInt(req.params.x_postition),
                                             false,
                                             false);
        // debugger;
        if (validPlacement) {

          board.placeBoat( req.params.boat_type,
                           req.params.orientation,
                           parseInt(req.params.y_position),
                           parseInt(req.params.x_postition),
                           true,
                           false);
        } else {

          res.json({ success: false, message: 'Not a valid placement' });
          return;
        }

        game.player.shipState = JSON.stringify(playerState);
        game.player.board = JSON.stringify(board.state);

        game.save(function(err, game) {

          if (err) res.send(err);
          res.json({ status: true, message: 'Boat placed.' });
        })
      }
    });
  })

router.route('/games/:game_id/fire/:x_position/:y_position')
  .post(function(req, res) {

    Game.findOne({
      _id: req.params.game_id
    }, function(err, game) {

      if (err) throw err;

      if (!game) {
        res.json({ success: false, message: 'Game not found.' });
        return;
      }

      else if (game) {

        if (!game.playersTurn) {
          res.json({ success: false, message: 'Not players turn.' });
          return;
        }

        var board = new BoardModel();
        var ai = new PlayerModel();

        //derserialize the state
        board.state = JSON.parse(game.ai.board);
        aiState = JSON.parse(game.ai.shipState);

        ai.shipState = playerState;

        var r = parseInt(req.params.y_position);
        var c = parseInt(req.params.x_position);

        var hit = board.fire(r,c);

        if (hit) {

          var sunk = ai.damage(board.state[r][c].shipClass);
          debugger;

          if (sunk) {
            var shipSunk = board.state[r][c].shipClass;
            var won = ai.shipStateInfo('sunk');
          }
        }

        game.ai.shipState = JSON.stringify(aiState);
        game.ai.board = JSON.stringify(board.state);
        game.playersTurn = false;
        game.round += 1;

        game.save(function(err, game) {
          var msgStrng = 'Volly was a '

          if (hit) {

            msgStrng += 'hit.';
          } else {

            msgStrng += 'miss';
          }

          if (sunk) {

            msgStrng += ' You sunk the '+shipSunk+'!';
            debugger;
          }
          if (won) {

              msgStrng += ' You won the game!';
          }

          if (err) res.send(err);
          res.json({ status: true, message: msgStrng });
        })

      }
    })
  });

router.route('/games/:game_id/ai_fire')
  .post(function(req, res) {

    Game.findOne({
      _id: req.params.game_id
    }, function(err, game) {

      if (err) throw err;

      if (!game) {
        res.json({ success: false, message: 'Game not found.' });
        return;
      }

      else if (game) {

        if (game.playersTurn) {
          res.json({ success: false, message: 'Not ai\'s turn.' });
          return;
        }

        var board = new BoardModel();
        var player = new PlayerModel();
        var fs = new FiringSolutionModel();

        //derserialize the state
        board.state = JSON.parse(game.player.board);
        playerState = JSON.parse(game.player.shipState);

        player.shipState = playerState;

        fs =


// REGISTER OUR ROUTES ---------------------------------------------------------
app.use('/api',router);

// START THE SERVER
// =============================================================================
if (enviorment == 'production') app.listen(port, config.private_ip);
if (enviorment == 'development') app.listen(port);
console.log('Server started on port ' + port);
