exports.belt = {
    cols: "A B C D E F G H I J",
    rows: "1 2 3 4 5 6 7 8 9 10",
    spacers: "# 1 2 3 4 5 6 7 8 9 X",
    directions: ["up", "down", "left", "right"],
    charMap: "A B C D E F G H I J".split(" ")
        .reduce(function(obj, key, i) {
            obj[key] = i + 1;
            return obj;
        }, {}),
    randNum: function(maxInt) {
        return Math.floor(Math.random() * maxInt) + 1
    }
}

exports.ships = {
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
