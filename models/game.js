var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GameSchema   = new Schema({
    game_number: String
});

module.exports = mongoose.model('Game', GameSchema);
