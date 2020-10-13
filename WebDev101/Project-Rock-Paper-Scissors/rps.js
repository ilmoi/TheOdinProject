console.log('its alive!!!');
console.log('can run this on its own');

//computer chooses rps - random
function computerPlay() {
    const computerSelection = Math.floor(Math.random() * 100);
    if (computerSelection <= 33) {return 'rock'}
    if (computerSelection <= 66) {return 'paper'}
    return 'scissors'
}

//player chooses rps - input
function playerPlay() {
    //take user input
    //make case insensitive
    //check it makes sense
    let playerSelection;
    const okAnswers = ['rock', 'paper', 'scissors'];
    do {
        playerSelection = window.prompt('Please enter Rock / Paper / Scissors: ', 'rock')
            .toLowerCase();
    } while (okAnswers.indexOf(playerSelection) < 0);
    //return that input
    return playerSelection;
}

//play 1 round
function playRound(computerSelection, playerSelection) {
    //logic goes here
    let winner;
    switch (computerSelection) {
        case 'rock':
            if (playerSelection === 'rock') {winner = 'tie'}
            if (playerSelection === 'paper') {winner = 'player'}
            if (playerSelection === 'scissors') {winner = 'computer'}
            break;
        case 'paper':
            if (playerSelection === 'rock') {winner = 'computer'}
            if (playerSelection === 'paper') {winner = 'tie'}
            if (playerSelection === 'scissors') {winner = 'player'}
            break;
        case 'scissors':
            if (playerSelection === 'rock') {winner = 'player'}
            if (playerSelection === 'paper') {winner = 'computer'}
            if (playerSelection === 'scissors') {winner = 'tie'}
            break;
    }
    //console log "[Computer] loses! [Paper] beats [Rock]."
    switch (winner) {
        case 'tie':
            console.log('on no, its a tie!');
            break;
        case 'player':
            console.log(`Player wins! ${playerSelection} beats ${computerSelection}`);
            break;
        case 'computer':
            console.log(`Computer wins! ${computerSelection} beats ${playerSelection}`);
            break;
    }
    //return the winner
    return winner;
}

//play until 3 == overall game engine
function playRPS() {
    //init empty scores
    let computerScore = 0;
    let playerScore = 0;
    //while max score is < 3: keep replaying the round, updating the score
    let computerSelection, playerSelection, winner;
    do {
        console.log('lets play!')
        computerSelection = computerPlay();
        playerSelection = playerPlay();
        winner = playRound(computerSelection, playerSelection);
        if (winner === 'computer') {
            computerScore += 1;
        } else if (winner === 'player') {
            playerScore += 1;
        }
    } while (Math.max(computerScore, playerScore) < 3);
    //announce final winner (use an alert for fun)
    computerScore > playerScore ? console.log ('GAME OVER. COMPUTER WON.') : console.log('GAME OVER. YOU WON!')
}

playRPS();