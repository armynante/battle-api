
require('node-jsx').install();

var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var morgan     = require('morgan');
var jwt        = require('jsonwebtoken');
var async      = require('async');
var bcrypt     = require('bcryptjs');
var config     = require('./config.js');
var renderer   = require('react-engine');


//APP SETTUP
var port       = '8080';
var logger     = morgan('combined');
var app        = express();
var enviorment = process.env.CURRENT_ENV;

var engine     = renderer.server.create();

app.engine('.jsx', engine);
app.set('views', __dirname + '/public/views');
app.set('view engine', 'jsx');
app.set('view', renderer.expressView);


//MODELS
var User                 = require('./models/user');
var Game                 = require('./models/game');
var Board                = require('./models/board');
var BoardModel           = require('./models/boardModel');
var PlayerModel          = require('./models/playerModel');
var GameModel            = require('./models/gameModel');
var FiringSolutionModel  = require('./models/FiringSolutionModel');
var SalvoModel           = require('./models/SalvoModel');

if (enviorment == 'production') mongoose.connect(config.production_database);
if (enviorment == 'development') mongoose.connect(config.development_database);


// ADD MIDDLEWARE
app.use(express.static(__dirname + '/public'));
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.route('/register')
  .post(function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
      if (err) throw error;
      if (user) {
        res.json(400, {success:false,message: 'Email already in use'});
        return;
      } else {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(req.body.password, salt, function(err, hash) {
            user = new User({ email:req.body.email, password:hash });
            user.save(function(err,user) {
              if (err) throw error;
              var token = jwt.sign(user, config.secret, { expiresIn: config.token_expriration });
              res.json(201, {success:true,user_id: user.id, token: token});
            });
          });
        });
      }
    });
  });


router.route('/auth')
  .post(function(req, res) {

    User.findOne({
      email: req.body.email
    }, function(err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found or password wrong.' });
      }

      else if (user) {

        bcrypt.compare(req.body.password, user.password, function(err, correctPass) {
          if (!correctPass) {

            res.json({ success: false, message: 'Authentication failed. User not found or password wrong.' });
          } else {

            var token = jwt.sign(user, config.secret, { expiresIn: config.token_expriration });
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token
            });
          }
        });
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

  .get(function(req, res) {
    User.findOne({
      _id: req.params.user_id
    }, function(err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'User not found.' });
      }

      else if (user) {

        var new_game = new Game();
            new_game.owner = user.id;

        Board.random(function(err, board) {
          new_game.ai_board_id = board.id;

          new_game.ai.board = board.layout;


          new_game.save(function(err) {
            if (err) res.send(err);
            res.json({ message: 'New game created!', game_id: new_game.id  });
          })
        });
      }
    });
  })

router.route('/users/:user_id/games/comp_vs_comp')

  .get(function(req, res) {
    User.findOne({
      _id: req.params.user_id
    }, function(err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'User not found.' });
      }

      else if (user) {

        var new_game = new Game();
            new_game.owner = user.id;

        async.parallel([
          function(callback) {

            Board.random(function(err, board) {

                new_game.ai_board_id = board.id;
                new_game.ai.board = board.layout;
                callback(err);
            })
          },
          function(callback) {

            Board.random(function(err, board) {

                new_game.player_board_id = board.id;
                new_game.player.board = board.layout;
                callback(err);
            })
          }
        ], function(err) {

          if (err) throw errl
            new_game.save(function(err) {

              if (err) res.send(err);
              res.json({ message: 'New comp_vs_comp game created!', game_id: new_game.id  });
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

          if (sunk) {
            var shipSunk = board.state[r][c].shipClass;
            var won = ai.shipStateInfo('sunk');
          }
        }

        game.ai.shipState = JSON.stringify(aiState);
        game.ai.board = JSON.stringify(board.state);
        game.playersTurn = false;
        game.round++

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

        // if (game.playersTurn) {
        //   res.json({ success: false, message: 'Not ai\'s turn.' });
        //   return;
        // } else

        //increment the round

        var board = new BoardModel();
        var player = new PlayerModel();

        //derserialize the state
        board.state = JSON.parse(game.player.board);
        player.shipState = JSON.parse(game.player.shipState);
        statusReport = JSON.parse(game.ai.statusReport);
        var fs = new FiringSolutionModel(player,board);

        if (game.over) {
          game.ai.board = JSON.parse(game.ai.board);
          game.ai.shipState = JSON.parse(game.ai.shipState);
          game.player.board = JSON.parse(game.player.statusReport);
          game.player.shipState = JSON.parse(game.player.shipState);
          res.json({ success: false, message: 'Game is over', game: game });
          return;
        }


        var report = fs.autoFire(); //FIRE ON THE PLAYER NOT THE AI

        game.playersTurn = true;
        game.lastMove = report.move;
        game.ai.moves.push(report.move);

        if (report.status === 'over') {

          game.winner = 'AI';
          game.over = true;
          statusReport.lastHit = report.move;
          statusReport.over = true;
          statusReport.shipsSunk.push(report.ship);
        } else if (report.status === 'sunk') {

          statusReport.shipsSunk.push(report.ship);
        } else if (report.status === 'hit') {

          statusReport.lastHit = report.move;
          statusReport.lastMove = report.move;
        } else if (report.status === 'miss'){

          statusReport.lastMove = report.move
        } else {
          res.json({ success: false, message: 'Error in game proccessing', game: gameState });
          return;
        }

        var returnReport = statusReport;
        game.round++;
        returnReport.round = game.round;
        game.player.shipState = JSON.stringify(fs.player.shipState);
        game.player.board = JSON.stringify(fs.board.state);
        game.ai.statusReport = JSON.stringify(statusReport);
        game.save(function(err, game) {

          if (err) throw err;

          res.json({success:true, message: returnReport});
        });
      }
    });
  })

// REGISTER OUR ROUTES ---------------------------------------------------------
app.get('', function(req, res) {
  res.render('index', {
    title: 'HOME'
  });
})

app.use('/api',router);

// START THE SERVER
// =============================================================================
if (enviorment == 'production') app.listen(port, config.private_ip);
if (enviorment == 'development') app.listen(port);
console.log('Server started on port ' + port);
