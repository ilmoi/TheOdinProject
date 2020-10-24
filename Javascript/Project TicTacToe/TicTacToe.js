const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const inquirer = require('inquirer');


//------------------------------------------------------------------------------
// gameboard = module
const gameBoard = (() => {
  let board = [
    ['_', '_', '_'],
    ['_', '_', '_'],
    ['_', '_', '_']
  ];

  const printBoard = () => {
    //prints the board in a nice way
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);
  }

  const _isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  const _parseEntry = (proposedMove) => {
    const row = parseInt(proposedMove.slice(0, 1));
    const col = parseInt(proposedMove.slice(1, 2));
    return [row, col];
  }

  const checkLegal = (proposedMove) => {
    //checks if the move is legal, return T/F
    if (!_isNumeric(proposedMove)) return false;
    const intMove = parseInt(proposedMove);
    if (intMove < 11 || intMove > 33) return false;
    const row = _parseEntry(proposedMove)[0];
    const col = _parseEntry(proposedMove)[1];
    if (row < 1 || row > 3) return false;
    if (col < 1 || col > 3) return false;
    return true;
  }

  const checkFree = (proposedMove) => {
    const row = _parseEntry(proposedMove)[0];
    const col = _parseEntry(proposedMove)[1];
    if (board[row - 1][col - 1] === "_") return true;
    return false;
  }

  const update = (mark, proposedMove) => {
    //updates the board, returns new board
    const row = _parseEntry(proposedMove)[0];
    const col = _parseEntry(proposedMove)[1];
    board[row - 1][col - 1] = mark;
  }

  const _arrayEquals = (a, b) => {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

  const _checkWinner = x => {
    let DiagonalScore = 0;
    let ReverseDiagonalScore = 0;
    for (let i = 0; i < 3; i++) {
      //horizontal
      if (_arrayEquals(board[i], [x, x, x])) return true;
      //vertical
      if (board[0][i] === x && board[1][i] === x && board[2][i] === x) return true;
      //diagonal
      if (board[i][i] === x) DiagonalScore++;
      //reverse diagonal
      if (board[2 - i][i] === x) ReverseDiagonalScore++;
    }
    if (DiagonalScore === 3 || ReverseDiagonalScore === 3) return true;
    return false;
  }

  const checkWinner = () => {
    //checks if one of the players has won the game, returns which if so
    const checkX = _checkWinner("x");
    const checkO = _checkWinner("o");
    return checkX ? 'x' : checkO ? 'o' : false;
  }

  return {printBoard, checkLegal, checkFree, update, checkWinner};
})();

//------------------------------------------------------------------------------
// players = objects / classes
class Player {
  constructor(nr, name, mark) {
    this.nr = nr;
    this.name = name;
    this.mark = mark;
    this.movesHistory = [];
  }

  async proposeMove() {
    //ask user for input and return it
    let proposedMove;
    //inquirer
    const q = {
      type: 'input',
      name: 'move',
      message: "Enter your move: "
    }
    const answer = await inquirer.prompt(q);
    return answer.move;
  }

  recordMove(move) {
    //store the user's move once it's been validated by the gameboard
    this.movesHistory.push(move);
    console.log(this.movesHistory);
  }
}

const p0 = new Player(0, 'foo', 'x');
const p1 = new Player(1, 'bar', 'o')
const players = [p0, p1];


//------------------------------------------------------------------------------
// displayController = module
const displayController = (() => {
  const _beginGame = () => {
    //print welcome msg
    console.log("Welcome to ze awesome TTT")
    //print rules re how to enter stuff into console
    console.log("how it works: type 2 numbers ONLY, each between 1 and 3 (no spaces), to signify your move")
    console.log("eg to place a mark into bottom left corner type 33. First cell = 11. Bang in the center = 22. You get it.")
  }

  const _makeMove = async (activePlayer) => {
    try {
      //print the board
      gameBoard.printBoard();
      //takes user input from 1 of the players
      const proposedMove = await activePlayer.proposeMove();
      //check if legal / free
      if (!gameBoard.checkLegal(proposedMove)) throw new Error("bad entry");
      if (!gameBoard.checkFree(proposedMove)) throw new Error("bad entry");
      //record the move if legal
      activePlayer.recordMove(proposedMove);
      console.log('got to update')
      //update the board
      gameBoard.update(activePlayer.mark, proposedMove);
      //checks if there's a winner - if not, hands over to the other player
      let winner = gameBoard.checkWinner();
      if (winner) {
        console.log(`Game over! ${winner} won!`);
        return process.exit(22);
      }
      //else swap the player
      const playerNum = parseInt(activePlayer.nr);
      const nextPlayer = players[1 - playerNum];
      _makeMove(nextPlayer);
    } catch (e) {
      console.log('oops bad entry!')
      console.log("how it works: type 2 numbers ONLY, each between 1 and 3 (no spaces), to signify your move")
      console.log("eg to place a mark into bottom left corner type 33. First cell = 11. Bang in the center = 22. You get it.")
      console.log('lets try again...')
      return _makeMove(activePlayer);
    }
  };

  const play = () => {
    //the function that actually plays!
    _beginGame();
    //TODO make this random afterwards
    let activePlayer = p0;
    _makeMove(activePlayer);
  }

  return {play}
})();

displayController.play();

