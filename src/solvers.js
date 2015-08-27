/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

function boardCreator(n, queens, findOne) {
  n = n || 0;
  var choices = _.range(n);
  var thisBoard = new Board({n: n});
  var boardCount = 0;
  var shouldBreak = false;
  var conflicts;
  var combos = function(n) {
    if (n === 0) {
      boardCount++;

      if (findOne) {
        shouldBreak = true;
      }

      return;
    }
    for (var i = 0; i < choices.length; i++) {
      thisBoard.togglePiece(n - 1, i);

      if (queens) {
        conflicts = thisBoard.hasAnyQueensConflicts();
      } else {
        conflicts = thisBoard.hasAnyRooksConflicts();
      }

      if (!conflicts) {
        combos(n - 1);
      }

      if (shouldBreak) {
        return;
      }

      thisBoard.togglePiece(n - 1, i);
    }
  };
  combos(n);
  return findOne ? thisBoard.rows() : boardCount;
};


window.findNRooksSolution = function(n) {
  var solution = boardCreator(n, false, true);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = boardCreator(n, false, false);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = boardCreator(n, true, true);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = boardCreator(n, true, false);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
