function Salvo(player) {
    var _this = this;
    this.player = player;
    this.row = null;
    this.col = null;
    this.hit = false;

    this.fire = function(row,col) {
        _this.row = row;
        _this.col = col;
        _this.hit = game[_this.player].board.fire(row, col);
        _this.applyDamage();

    }

    this.fireBlind = function() {
        var validShips = game[_this.player].shipsLeft(); // on a ship state
        var bestGuess = game[_this.player].board.calculateDensity(validShips); //on board

        _this.row = bestGuess.row;
        _this.col = bestGuess.col;
        _this.hit = game[_this.player].board.fire(_this.row, _this.col); //has waterfall effects
        _this.applyDamage(); 
    }

    this.applyDamage = function() {
        if (_this.hit) {
            var shipClass = game[_this.player].board.state[_this.row][_this.col].shipClass;
            //check to see if the ship sunk;
            _this.sunk = game[_this.player].damage(shipClass);
        }
    }

}



module.exports = function firingSolution(player) {
    var _this = this;
    this.player = player; // player is the target
    this.targetArea = [];
    this.lastHits = [];
    this.lastShipSunk = null;

    //This function if for human consumption
    this.openFire = function(row,col) {
        round++;
        var salvo = new Salvo(_this.player);
        salvo.fire(row,col);
    }


    //Only to be called by AI
    this.autoFire = function(r,c) {
        round++;
        var salvo = new Salvo(_this.player);

        //make sure there are ships left to hit
        //i.e the game is not over
        if (!game[_this.player].shipStateInfo('sunk')) {
            if (_this.targetArea.length > 0) {
                var target = _this.targetArea.pop();
                salvo.fire(target.row,target.col);
            } else {
                salvo.fireBlind();
                if (salvo.hit) {
                   _this.targetArea = game[_this.player].board.surroundingTiles(salvo.row, salvo.col) //onboard
                };
            }
        } else {
            // needed for ai vs ai battles
            return true;
        }
    }
}
