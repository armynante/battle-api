// module.exports = function firingSolution(player) {
//     var _this = this;
//     this.player = player; // player is the target
//     this.targetArea = [];
//     this.lastHits = [];
//     this.lastShipSunk = null;
//
//     //This function if for human consumption
//     this.openFire = function(row,col) {
//         round++;
//         var salvo = new Salvo(_this.player);
//         salvo.fire(row,col);
//     }
//
//
//     //Only to be called by AI
//     this.autoFire = function(r,c) {
//         round++;
//         var salvo = new Salvo(_this.player);
//
//         //make sure there are ships left to hit
//         //i.e the game is not over
//
//         if (!game[_this.player].shipStateInfo('sunk')) {
//             if (_this.targetArea.length > 0) {
//                 var target = _this.targetArea.pop();
//                 salvo.fire(target.row,target.col);
//             } else {
//                 salvo.fireBlind();
//                 if (salvo.hit) {
//                    _this.targetArea = game[_this.player].board.surroundingTiles(salvo.row, salvo.col)
//                 };
//             }
//         } else {
//             // needed for ai vs ai battles
//             won = _this.player;
//             over = true;
//         }
//     }
// }
