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

function diagonalBoard(n) {
  var array = [];

  for (var i = 0; i < n; i++) {
    var row = [];

  for (var j = 0; j < n; j++) {
    if (i === j) {
      row.push(1);
    } else {
      row.push(0);
    }
  }
  array.push(row);
  }
  return array;
}

function boardCreator(n) {
  n = n || 0;
  var choices = diagonalBoard(n);
  var boards = [];
  var thisBoard = [];
  var combos = function(n) {
    if (n === 0) {
      boards.push(thisBoard.slice());
      return;
    }
    for (var i = 0; i < choices.length; i++) {
      thisBoard.push(choices[i]);
      combos(n - 1);
      thisBoard.pop();
    }
  };
  combos(n);
  boards = _.map(boards, function(array) {return new Board(array);});
  return boards;
};




window.findNRooksSolution = function(n) {
  var boards = boardCreator(n);
  var solution;

  for (var i = 0; i < boards.length; i++) {
    if (!boards[i].hasAnyRooksConflicts()) {
      solution = boards[i].rows();
      console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
      return solution;
    }
  }
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var boards = boardCreator(n);

  for (var i = 0; i < boards.length; i++) {
    if (!boards[i].hasAnyRooksConflicts()) {
      solutionCount++;
    }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var boards = boardCreator(n);
  var solution;

  for (var i = 0; i < boards.length; i++) {
    if (!boards[i].hasAnyQueensConflicts()) {
      solution = boards[i].rows();
      console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
      return solution;
    }
  }

  solution = new Board({'n': n}).rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var boards = boardCreator(n);

  for (var i = 0; i < boards.length; i++) {
    if (!boards[i].hasAnyQueensConflicts()) {
      solutionCount++;
    }
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
