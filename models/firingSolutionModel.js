function Salvo(player,board) {
    var _this = this;
    this.player = player;
    this.board = board;
    this.row = null;
    this.col = null;
    this.hit = false;
    this.sunk = false;
    this.shipSunk = '';

    this.fire = function(row,col) {
        _this.row = row;
        _this.col = col;
        _this.hit = _this.board.fire(row, col);
        _this.applyDamage();

    }
    
    this.fireBlind = function() {
        var validShips = _this.player.shipsLeft(); // on a ship state
        var bestGuess = _this.board.calculateDensity(validShips); //on board

        _this.row = bestGuess.row;
        _this.col = bestGuess.col;
        _this.hit = _this.board.fire(_this.row, _this.col); //has waterfall effects
        _this.applyDamage();
    }

    this.applyDamage = function() {
        if (_this.hit) {
            var shipClass = _this.board.state[_this.row][_this.col].shipClass;
            //check to see if the ship sunk;
            _this.sunk = _this.player.damage(shipClass);
            _this.shipSunk = shipClass;
        }
    }

}

module.exports = function firingSolution(player,board) {
    var _this = this;
    this.player = player; // player is the target
    this.board = board; // player is the target
    this.targetArea = [];
    this.lastHits = [];
    this.lastShipSunk = null;

    //This function if for human consumption
    this.openFire = function(row,col) {
        var salvo = new Salvo(_this.player);
        salvo.fire(row,col);
    }


    //Only to be called by AI
    this.autoFire = function() {
        var salvo = new Salvo(_this.player,_this.board);

          if (_this.targetArea.length > 0) {

              var target = _this.targetArea.pop();
              salvo.fire(target.row,target.col);
          } else {
              salvo.fireBlind();
              if (salvo.hit) {

                 _this.targetArea = _this.board.surroundingTiles(salvo.row, salvo.col)
                 if (salvo.sunk) {

                   report =  { status:'', ship: salvo.shipSunk, move: salvo.row +','+ salvo.col}
                   _this.player.shipStateInfo('sunk') ? report.status = 'over' : report.status = 'sunk'
                   return report;
                 } else {

                   return { status:'hit', ship: null, move: salvo.row +','+ salvo.col};
                 }
              } else {

                return { status:'miss', ship: null, move: salvo.row +','+ salvo.col};
              }
          }
    }
}
