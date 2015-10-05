module.exports  = function Player(name) {
  
    this.name = name;
    this.placeState = [null];
    var _this = this;

    this.shipState = [{
        type: "submarine",
        placed: 1,
        sunk: 1,
        hitCount: 0
    }, {
        type: "carrier",
        placed: 1,
        sunk: 1,
        hitCount: 0
    }, {
        type: "destroyer",
        placed: 1,
        sunk: 1,
        hitCount: 0
    }, {
        type: "battleship",
        placed: 1,
        sunk: 1,
        hitCount: 0
    }, {
        type: "patrolBoat",
        placed: 1,
        sunk: 1,
        hitCount: 0
    }];

    this.damage = function(shipClass) {
        for (var i = 0; i < _this.shipState.length; i++) {
            if (_this.shipState[i].type === shipClass) {
                _this.shipState[i].hitCount++;
                if (_this.shipState[i].hitCount === Util.ships[shipClass].width) {
                    _this.shipState[i].sunk = 0;
                    console.log("You sunk the " + shipClass + " !");
                    // //Check to see is the game has been won.
                    if ( _this.shipStateInfo('sunk')) {
                        _this.player
                        won = _this.name;
                        over = true;
                    };;
                    return true;
                };
            }
        }
        return false;
    }

    this.shipsLeft = function() {
      var ships = [];
      for (var i = 0; i < _this.shipState.length; i++) {
        if (_this.shipState[i].sunk === 1) {
          ships.push(_this.shipState[i].type);
        };
      };
      return ships;
    }

    this.shipStateInfo = function(key) {
        var reducedObj;
        switch (key) {
            case 'sunk':
                reducedObj = _this.shipState.reduce(function(a, b) {
                    return {
                        sunk: a[key] + b[key]
                    }; // sums the value of a + b (values next to each other)
                });
                break;
            default:
                reducedObj = _this.shipState.reduce(function(a, b) {
                    return {
                        placed: a[key] + b[key]
                    }; // sums the value of a + b (values next to each other)
                });
                break;
        }
        if (key === 'sunk') {
            console.log(key + ": " + reducedObj[key]);
        };
        return reducedObj[key] === 0;
    };

    this.board = new Board();
    this.patrolBoatLocation = []; // array of tile locations
    this.carrierLocation = [];
    this.subLocation = [];
    this.destroyerLocation = [];
    this.battleshipLocation = [];

}
