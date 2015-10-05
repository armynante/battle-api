ships = {
    carrier: {
        width: 5,
        callSign: "C",
        possibleNames: ["carrier", "c", "Carrier", "C"]
    },
    battleship: {
        width: 4,
        callSign: "B",
        possibleNames: ["battle", "b", "battleship", "battle ship", "Battleship", "Battle", "B"]
    },
    destroyer: {
        width: 3,
        callSign: "D",
        possibleNames: ["d", "destroyer", "Destroyer", "D"]
    },
    submarine: {
        width: 3,
        callSign: "S",
        possibleNames: ["sub", "submarine", "s", "Sub", "Submarine"]
    },
    patrolBoat: {
        width: 2,
        callSign: "P",
        possibleNames: ["pb", "patrol", "patrol boat", "patrolboat", "Patrol Boat", "PB", "P", "p"]
    }
};

module.exports = function Game() {
    var _this = this;
    this.player1 = null;
    this.player2 = null;

    this.placeShipState = function(shipClass, row, col, orientation, player) {

        row = parseInt(row);
        col = parseInt(col);

        if (ships[shipClass]) {

            valid = _this[player].board.placeBoat(shipClass, orientation, row, col, false, false);

            if (valid) {
                _this[player].board.placeBoat(shipClass, orientation, row , col, true, false);
                return true;

            } else {

            }

        } else {

        }
    };

}
