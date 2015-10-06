var Util = require('../util');

module.exports  = function Player() {

    var _this = this;

    this.shipState = null;

    this.damage = function(shipClass) {
        for (var i = 0; i < _this.shipState.length; i++) {
            if (_this.shipState[i].type === shipClass) {
                _this.shipState[i].hitCount++;
                if (_this.shipState[i].hitCount === Util.ships[shipClass].width) {
                    _this.shipState[i].sunk = 0;
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
        return reducedObj[key] === 0;
    };


}
