console.log('its alive!!!');
console.log('can run this on its own');

//computer chooses rps - random
function computerPlay() {
    const computerSelection = Math.floor(Math.random() * 100);
    if (computerSelection <= 33) {return 'rock'}
    if (computerSelection <= 66) {return 'paper'}
    return 'scissors'
}

//NOT USED HERE
//player chooses rps - input
// function playerPlay() {
//     //take user input
//     //make case insensitive
//     //check it makes sense
//     let playerSelection;
//     const okAnswers = ['rock', 'paper', 'scissors'];
//     do {
//         playerSelection = window.prompt('Please enter Rock / Paper / Scissors: ', 'rock')
//             .toLowerCase();
//     } while (okAnswers.indexOf(playerSelection) < 0);
//     //return that input
//     return playerSelection;
// }

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

//NOT USED HERE
//play until 3 == overall game engine
// function playRPS() {
//     //init empty scores
//     let computerScore = 0;
//     let playerScore = 0;
//     //while max score is < 3: keep replaying the round, updating the score
//     let computerSelection, playerSelection, winner;
//     do {
//         console.log('lets play!')
//         computerSelection = computerPlay();
//         playerSelection = playerPlay();
//         winner = playRound(computerSelection, playerSelection);
//         if (winner === 'computer') {
//             computerScore += 1;
//         } else if (winner === 'player') {
//             playerScore += 1;
//         }
//     } while (Math.max(computerScore, playerScore) < 3);
//     //announce final winner (use an alert for fun)
//     computerScore > playerScore ? console.log ('GAME OVER. COMPUTER WON.') : console.log('GAME OVER. YOU WON!')
// }

//global variables that ideally I wouldn't keep global but for now it's ok
let userChoice;
let playerScore = 0;
let computerScore = 0;
const play_button = document.getElementById('play');

//collect user's choice when one of the choice buttons is clicked
const buttons = document.querySelectorAll('button[class="choice"]');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        userChoice = e.target.id;
        if (!userChoice) return;
        const display = document.getElementById('display');
        display.innerHTML = `You have chosen <strong>${userChoice}</strong>`;
    })
})


//trigger 1 round of game when the "Let's play" button is clicked
play_button.addEventListener('click', () => {
    if (!userChoice) return;
    const computerSelection = computerPlay();
    const winner = playRound(computerSelection, userChoice);
    if (winner === 'computer') {
        computerScore += 1;
    } else if (winner === 'player') {
        playerScore += 1;
    }
    if (Math.max(computerScore, playerScore) === 5) return gameOver(winner);
    createResultsHTML(computerSelection, userChoice, winner);
    createNextButton();
})


//create the results html
function createResultsHTML(computerSelection, playerSelection, winner) {
    const div = document.createElement('div');
    div.setAttribute('id', 'results')
    const computerChoice = document.createElement('p');
    computerChoice.textContent = `Computer chose: ${computerSelection}`
    const playerChoice = document.createElement('p');
    playerChoice.textContent = `Player chose: ${playerSelection}`
    const outcome = document.createElement('h1');
    outcome.textContent = `Winner is: ${winner}`
    div.appendChild(computerChoice);
    div.appendChild(playerChoice);
    div.appendChild(outcome)
    document.body.appendChild(div);
}


function createNextButton() {
    const button = document.createElement('button');
    button.setAttribute('id', 'next')
    button.textContent = 'Next round!'
    document.body.appendChild(button);
    button.addEventListener('click', nextRound); //makes the button listen for clicks
}


//next round
function nextRound() {
    const div = document.getElementById('results');
    const button = document.getElementById('next');
    document.body.removeChild(div);
    document.body.removeChild(button);
    const display = document.getElementById('display');
    display.innerHTML = 'PLEASE MAKE A CHOICE';
    const score = document.getElementById('score');
    score.innerText = `Score: Computer: ${computerScore}, Player: ${playerScore}`;
    userChoice = '';

}


//when one of players reaches 5
function gameOver(winner) {
    document.body.innerHTML = "";
    document.body.style.backgroundColor = 'black';
    const endText = document.createElement('h1');
    endText.style.cssText = 'display: flex; justify-content: center; align-items: center; width: 100%; height: 1000px;'
    if (winner === 'computer') {
        endText.textContent = 'YOU WON BABE'
        endText.style.color = 'green';
    } else if (winner === 'player') {
        endText.textContent = 'GTFO';
        endText.style.color = 'red';
    }
    document.body.appendChild(endText);
}