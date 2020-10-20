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

  const checkLegal = () => {
    //checks if the move is legal, return T/F
  }

  const update = () => {
    //checks if the move is legal
    //updates the board, returns new board
  }

  const checkWinner = () => {
    //checks if one of the players has won the game, returns which if so
  }

  return {printBoard, checkLegal, update, checkWinner};
})();

//------------------------------------------------------------------------------
// players = objects / classes
class Player {
  constructor(name, mark) {
    this.name = name;
    this.mark = mark;
    this.movesHistory = [];
  }

  proposeMove() {
    //ask user for input and return it
    let proposedMove;

    //readline approach
    rl.question("Enter your move: ", userInput => {
      proposedMove = userInput.trim() + '';
      rl.close();
    })

    //inquirer approach
    // const q = {
    //   type: 'input',
    //   name: 'move',
    //   message: "Enter your move: "
    // }
    // inquirer.prompt(q)
    //   .then(ans => {
    //     console.log(ans.move);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })

    return proposedMove;
  }

  recordMove(move) {
    //store the user's move once it's been validated by the gameboard
    this.movesHistory.push(move);
  }
}

const p1 = new Player('foo', 'x');
const p2 = new Player('bar', 'o')


//------------------------------------------------------------------------------
// displayController = module
const displayController = (() => {
  const _beginGame = () => {
    //print welcome msg
    //print rules re how to enter stuff into console
    //print the board
    //hand over to one of the players to make a amove
    gameBoard.printBoard();
    _makeMove();
  }

  const _makeMove = () => {
    //TODO make this random afterwards
    let activePlayer = p1;
    //takes user input from 1 of the players
    const proposedMove = activePlayer.proposeMove();
    //checks if legal
    //record the move if legal
    activePlayer.recordMove(proposedMove);
    //update the board
    //checks if there's a winner - if not, hands over to the other player
  }

  const play = () => {
    //the function that actually plays!
    _beginGame();
  }

  return {play}
})();

displayController.play();

