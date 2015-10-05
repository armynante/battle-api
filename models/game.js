var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GameSchema   = new Schema({
    owner:  String,
    board: String,
    round: { type: Boolean, default: false },
    winner: String,
    round: { type: Number, default: 0 },
    playersTurn: Boolean,
    player: { shipState: { type: String, default: '[{"type":"submarine","placed":1,"sunk":1,"hitCount":0},{"type":"carrier","placed":1,"sunk":1,"hitCount":0},{"type":"destroyer","placed":1,"sunk":1,"hitCount":0},{"type":"battleship","placed":1,"sunk":1,"hitCount":0},{"type":"patrolBoat","placed":1,"sunk":1,"hitCount":0}]' },
                  board: { type: String, default: '[[{"vacant":true,"shipClass":null,"hit":null,"row":0,"col":0,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":0,"col":1,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":0,"col":2,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":0,"col":3,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":0,"col":4,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":0,"col":5,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":0,"col":6,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":0,"col":7,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":0,"col":8,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":0,"col":9,"density":0}],[{"vacant":true,"shipClass":null,"hit":null,"row":1,"col":0,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":1,"col":1,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":1,"col":2,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":1,"col":3,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":1,"col":4,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":1,"col":5,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":1,"col":6,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":1,"col":7,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":1,"col":8,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":1,"col":9,"density":0}],[{"vacant":true,"shipClass":null,"hit":null,"row":2,"col":0,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":2,"col":1,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":2,"col":2,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":2,"col":3,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":2,"col":4,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":2,"col":5,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":2,"col":6,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":2,"col":7,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":2,"col":8,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":2,"col":9,"density":0}],[{"vacant":true,"shipClass":null,"hit":null,"row":3,"col":0,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":3,"col":1,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":3,"col":2,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":3,"col":3,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":3,"col":4,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":3,"col":5,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":3,"col":6,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":3,"col":7,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":3,"col":8,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":3,"col":9,"density":0}],[{"vacant":true,"shipClass":null,"hit":null,"row":4,"col":0,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":4,"col":1,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":4,"col":2,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":4,"col":3,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":4,"col":4,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":4,"col":5,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":4,"col":6,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":4,"col":7,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":4,"col":8,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":4,"col":9,"density":0}],[{"vacant":true,"shipClass":null,"hit":null,"row":5,"col":0,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":5,"col":1,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":5,"col":2,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":5,"col":3,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":5,"col":4,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":5,"col":5,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":5,"col":6,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":5,"col":7,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":5,"col":8,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":5,"col":9,"density":0}],[{"vacant":true,"shipClass":null,"hit":null,"row":6,"col":0,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":6,"col":1,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":6,"col":2,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":6,"col":3,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":6,"col":4,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":6,"col":5,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":6,"col":6,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":6,"col":7,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":6,"col":8,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":6,"col":9,"density":0}],[{"vacant":true,"shipClass":null,"hit":null,"row":7,"col":0,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":7,"col":1,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":7,"col":2,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":7,"col":3,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":7,"col":4,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":7,"col":5,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":7,"col":6,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":7,"col":7,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":7,"col":8,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":7,"col":9,"density":0}],[{"vacant":true,"shipClass":null,"hit":null,"row":8,"col":0,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":8,"col":1,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":8,"col":2,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":8,"col":3,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":8,"col":4,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":8,"col":5,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":8,"col":6,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":8,"col":7,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":8,"col":8,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":8,"col":9,"density":0}],[{"vacant":true,"shipClass":null,"hit":null,"row":9,"col":0,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":9,"col":1,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":9,"col":2,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":9,"col":3,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":9,"col":4,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":9,"col":5,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":9,"col":6,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":9,"col":7,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":9,"col":8,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":9,"col":9,"density":0}]]'}
            },
    ai: { shipState: { type: String, default: '[{"type":"submarine","placed":1,"sunk":1,"hitCount":0},{"type":"carrier","placed":1,"sunk":1,"hitCount":0},{"type":"destroyer","placed":1,"sunk":1,"hitCount":0},{"type":"battleship","placed":1,"sunk":1,"hitCount":0},{"type":"patrolBoat","placed":1,"sunk":1,"hitCount":0}]' },
              board: { type: String, default: '[[{"vacant":true,"shipClass":null,"hit":null,"row":0,"col":0,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":0,"col":1,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":0,"col":2,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":0,"col":3,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":0,"col":4,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":0,"col":5,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":0,"col":6,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":0,"col":7,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":0,"col":8,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":0,"col":9,"density":0}],[{"vacant":true,"shipClass":null,"hit":null,"row":1,"col":0,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":1,"col":1,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":1,"col":2,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":1,"col":3,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":1,"col":4,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":1,"col":5,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":1,"col":6,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":1,"col":7,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":1,"col":8,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":1,"col":9,"density":0}],[{"vacant":true,"shipClass":null,"hit":null,"row":2,"col":0,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":2,"col":1,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":2,"col":2,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":2,"col":3,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":2,"col":4,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":2,"col":5,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":2,"col":6,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":2,"col":7,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":2,"col":8,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":2,"col":9,"density":0}],[{"vacant":true,"shipClass":null,"hit":null,"row":3,"col":0,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":3,"col":1,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":3,"col":2,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":3,"col":3,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":3,"col":4,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":3,"col":5,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":3,"col":6,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":3,"col":7,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":3,"col":8,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":3,"col":9,"density":0}],[{"vacant":true,"shipClass":null,"hit":null,"row":4,"col":0,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":4,"col":1,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":4,"col":2,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":4,"col":3,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":4,"col":4,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":4,"col":5,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":4,"col":6,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":4,"col":7,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":4,"col":8,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":4,"col":9,"density":0}],[{"vacant":true,"shipClass":null,"hit":null,"row":5,"col":0,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":5,"col":1,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":5,"col":2,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":5,"col":3,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":5,"col":4,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":5,"col":5,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":5,"col":6,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":5,"col":7,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":5,"col":8,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":5,"col":9,"density":0}],[{"vacant":true,"shipClass":null,"hit":null,"row":6,"col":0,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":6,"col":1,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":6,"col":2,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":6,"col":3,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":6,"col":4,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":6,"col":5,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":6,"col":6,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":6,"col":7,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":6,"col":8,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":6,"col":9,"density":0}],[{"vacant":true,"shipClass":null,"hit":null,"row":7,"col":0,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":7,"col":1,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":7,"col":2,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":7,"col":3,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":7,"col":4,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":7,"col":5,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":7,"col":6,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":7,"col":7,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":7,"col":8,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":7,"col":9,"density":0}],[{"vacant":true,"shipClass":null,"hit":null,"row":8,"col":0,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":8,"col":1,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":8,"col":2,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":8,"col":3,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":8,"col":4,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":8,"col":5,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":8,"col":6,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":8,"col":7,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":8,"col":8,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":8,"col":9,"density":0}],[{"vacant":true,"shipClass":null,"hit":null,"row":9,"col":0,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":9,"col":1,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":9,"col":2,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":9,"col":3,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":9,"col":4,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":9,"col":5,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":9,"col":6,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":9,"col":7,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":9,"col":8,"density":0},{"vacant":true,"shipClass":null,"hit":null,"row":9,"col":9,"density":0}]]'}
        }
});


module.exports = mongoose.model('Game', GameSchema);
