belt = {
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


module.exports = function(){

      var _this = this;

      this.renderedBoard = [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
      ];

      this.state = null;

      this.availableTiles = {};

      this.buildBoard = function() {
          for (var r = 0; r < belt.cols.split(" ").length; r++) {
              for (var c = 0; c < belt.rows.split(" ").length; c++) {
                  var tile = new Tile(r, c);

                  _this.state[r][c] = tile;
                  stringKey = r.toString() + c.toString()
                  _this.availableTiles[stringKey] = tile;
              }
          }
          _this.state;
      };

      this.randomKey = function() {
          var result;
          var count = 0;
          for (var prop in _this.availableTiles) {
              if (Math.random() < 1 / ++count) {

                  result = prop;
              }
          };
          return _this.availableTiles[result]
      }

      // visiblity allows diferent render states
      // 'VISIBLE' allows for board to show ship class
      // this.render = function(visibility) {
      //
      //     for (var r = 0; r < _this.state.length; r++) {
      //         for (var c = 0; c < _this.state.length; c++) {
      //             var state = _this.state[r][c];
      //             _this.renderedBoard[r][c] = clc.blackBright("0")
      //             if (r % 2 === 0) {
      //                  _this.renderedBoard[r][c] = clc.blackBright("0")
      //             }
      //             if (state.hit) {
      //                 _this.renderedBoard[r][c] = clc.redBright("!");
      //             }
      //             if (state.hit === false) {
      //                 _this.renderedBoard[r][c] = clc.magenta("X");
      //             }
      //
      //             if (visibility === 'visible') {
      //
      //                 state.vacant ? _this.renderedBoard[r][c] = clc.blackBright("0") : _this.renderedBoard[r][c] = clc.whiteBright(ships[state.shipClass].callSign);
      //
      //                 if (state.hit) {
      //                     _this.renderedBoard[r][c] = clc.redBright("!");
      //                 }
      //                 if (state.hit === false) {
      //                     _this.renderedBoard[r][c] = clc.magenta("X");
      //                 }
      //
      //             }
      //
      //
      //         }
      //     }
      //     _this.renderedBoard.splice(0, 0, belt.cols.split(" "));
      //
      //     for (var i = 0; i < _this.renderedBoard.length; i++) {
      //         _this.renderedBoard[i].splice(0, 0, belt.spacers.split(" ")[i]);
      //     }
      //
      //     for (var n = 0; n < _this.renderedBoard.length; n++) {
      //         var line = _this.renderedBoard[n].join("  ");
      //         if (n === 0) {
      //             console.log(clc.yellow(line));
      //         } else {
      //             var row = _this.renderedBoard[n].splice(0, 1);
      //             var rest = _this.renderedBoard[n].join("  ");
      //
      //             console.log(clc.green(row[0]) + "  " + rest);
      //         }
      //     };
      //     _this.renderedBoard.splice(0, 1);
      //     console.log("\n");
      // };

      // startRow and startCol are form input
      // remember to add a 1;
      this.placeBoat = function(shipClass, orientation, startRow, startCol, live, densityTest) { //refactor

          var validity = [0];

          switch (orientation) {

              case "up":
                  if (ships[shipClass] === undefined){

                    validity.push(1);
                    break;
                  }
                  for (var i = 0; i < ships[shipClass].width; i++) {

                      var row = startRow - i ;
                      var col = startCol;

                      if (densityTest) {
                        val = _this.densityTest(row, col, shipClass);
                      } else {
                        val = _this.runPlacements(row, col, live, shipClass);
                      }

                      validity.push(val);
                  }
                  break;
              case "down":
                  if (ships[shipClass] === undefined){

                    validity.push(1);
                    break;
                  }
                  for (var i = 0; i < ships[shipClass].width; i++) {

                      var row = startRow + i;
                      var col = startCol;

                      if (densityTest) {
                        val = _this.densityTest(row, col, shipClass);
                      } else {
                        val = _this.runPlacements(row, col, live, shipClass);
                      }
                      validity.push(val);
                  }
                  break;
              case "left":
                  if (ships[shipClass] === undefined){

                    validity.push(1);
                    break;
                  }
                  for (var i = 0; i < ships[shipClass].width; i++) {
                      var row = startRow
                      var col = startCol - i;


                      if (densityTest) {
                        val = _this.densityTest(row, col, shipClass);
                      } else {
                        val = _this.runPlacements(row, col, live, shipClass);
                      }

                      validity.push(val);
                  }
                  break;
              case "right":
                  if (ships[shipClass] === undefined){

                    validity.push(1);
                    break;
                  }
                  for (var i = 0; i < ships[shipClass].width; i++) {

                      var row = startRow;
                      var col = startCol + i;

                      if (densityTest) {
                        val = _this.densityTest(row, col, shipClass);
                      } else {
                        val = _this.runPlacements(row, col, live, shipClass);
                      }

                      validity.push(val);
                  }
                  break;
              default:
                validity.push(1)

          }
          sum = validity.reduce(function(a, b) {
              return a + b;
          })
          return sum === 0;
      };

      // 1 is added to the index on row and col
      this.calculateDensity = function(shipsArray) {
          var orientations = ['up','down','left','right'];
          var highestDensity = 0;
          var bestGuess = null;

          for (var i = 0; i < _this.state.length; i++) {
            for (var c = 0; c < _this.state[i].length; c++) {
              _this.state[i][c].density = 0;
            };
          };

          for (var s = 0; s < shipsArray.length; s++) {
            for (var o = 0; o < orientations.length; o++) {
              for (var r = 0; r < _this.state.length; r++) {
                for (var c = 0; c < _this.state[r].length; c++) {
                  valid = _this.placeBoat(shipsArray[s], orientations[o], r, c, false, true);

                  if (valid) {
                    _this.state[r][c].density += 1;
                  }
                };
              };
            };
          }

          //density is calculated by all ship locations that are open or hit
          for (var r = 0; r < _this.state.length; r++) {
              for (var c = 0; c < _this.state[r].length; c++) {
                if ( _this.state[r][c].density >= highestDensity && _this.state[r][c].hit === null) {
                  highestDensity = _this.state[r][c].density;
                  bestGuess = _this.state[r][c];
                };
              }
          }
          return bestGuess;
      }

      this.runPlacements = function(row, col, live, shipClass) {
          if (col >= 0 && row >= 0 && col <= 9 && row <= 9) {
              var position = _this.state[row][col];
              if (position.vacant) {
                  if (live) {
                      _this.state[row][col].shipClass = shipClass;
                      _this.state[row][col].vacant = false;
                  } else {
                      return 0;
                  }
              } else {
                  return 1;
              }
          } else {
              return 1;
          }
      };

      this.densityTest = function(row, col, shipClass) {

          if (col >= 0 && row >= 0 && col <= 9 && row <= 9) {

              var position = _this.state[row][col];
              if (position.hit === null || position.hit === true) {
                return 0
              } else {
                  return 1;
              }
          } else {
              return 1;
          }
      };

      this.surroundingTiles = function(r, c) {
          var boxArray = [
              [0, 1],
              [0, -1],
              [1, 0],
              [-1, 0],
          ]
          var tiles = [];
          for (var i = 0; i < boxArray.length; i++) {
              var row = boxArray[i][0] + r;
              var col = boxArray[i][1] + c;

              if (col >= 0 && row >= 0 && col <= 9 && row <= 9 && _this.state[row][col].hit === null) {;
                  tiles.push(_this.state[row][col]);
              };
          };
          return tiles;
      }

      this.fire = function(r, c) {
          tile = _this.state[r][c];
          if (!tile.vacant && tile.hit === null) {
              _this.state[r][c].hit = true;
              return true;
          }
          else {
              _this.state[r][c].hit = false;
              return false
          }
      }



      this.initialiaze = function() {
          _this.buildBoard();
      };
  }
