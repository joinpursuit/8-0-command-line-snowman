//importing(?) the the readline library
const readline = require('readline-sync');
//set wins and losses outside of the function so we can retain their values through recursion
let tiktakWins = 0;
let tiktakLosses = 0;
let tiktakTies = 0;

function ttt(name) {
  //If the user didn't provide a username, ask for one. If they input a blank, give them a default
  let userName = name || readline.question('Enter your username: ') || 'User';
  //setup variables for the game
  let gameState = new Array(9).fill('-');
  let message = `Enjoy your game, ${userName}!`;
  let signs = ['X', 'O'];
  let signChoice = '';
  let signMessage = '';
  let validInput = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  //Create choice loop
  while (!signs.includes(signChoice)) {
    //Show message (if there is one)
    console.log(signMessage);
    //Ask if they want X or O
    signChoice = readline.question('Choose your sign! (X, O): ');
    //Make it uppercase
    signChoice = signChoice.toUpperCase();
    //if they input an invalid choice, send them back with a message
    signMessage = 'Invalid choice, please input X or O';
  }
  //remove our choice from the signs array ( so we can use the remaining sign for the cpu)
  signChoice === 'X' ? signs.splice(0, 1) : signs.splice(1, 1);
  //Create game loop
  while (!winCheck(gameState) && gameState.includes('-')) {
    //print the current state of the game
    console.log(
      `${gameState.slice(0, 3).join(' ')}\n${gameState
        .slice(3, 6)
        .join(' ')}\n${gameState.slice(6, 9).join(' ')}`
    );
    //print signChoice
    console.log(`Remember! You're sign is ${signChoice}!`);
    //print message
    console.log(message);
    //ask for an input
    let input = readline.question(
      'Make your move using numpad notation! (1-9): '
    );
    //check if input is valid (1-9)
    if (!validInput.includes(input)) {
      //if it isn't, give an error message and send them back
      message = `${userName}, your input of '${input}' was invalid.\nPlease under a number from 1-9.`;
      continue;
    }
    //convert input into a valid index
    input = convertNotation(Number(input));
    //check if the corresponding index is available in the game
    if (gameState[input] === '-') {
      //if it is, give a message and replace it the empty spot with our sign
      message = `Good move ${userName}!`;
      gameState[input] = signChoice;
    } else {
      // if it isn't
      //give a error message, and send them back.
      message = `Sorry ${userName}, that spot is already occupied.`;
      continue;
    }
    //check if someone won or game is tied
    if (winCheck(gameState) || !gameState.includes('-')) {
      //if they did, break the loop
      continue;
    }
    //Then give the cpu a turn
    //create cpu turn loop
    let turnCheck = false;
    while (turnCheck === false) {
      //generate random number from 0-8 for our random move
      let randomMove = Math.floor(Math.random() * 9);
      //check if that index is empty
      if (gameState[randomMove] === '-') {
        //if it is, replace it the empty spot with the cpu's sign
        gameState[randomMove] = signs[0];
        //and change the turnCheck to false
        turnCheck = true;
      }
    }
  }
  //Create a ending message variable
  let endingMessage = '';
  //Check if we won
  switch (true) {
    //Check if we won
    case winCheck(gameState) === signChoice:
      //if we did, make our ending message a winning message
      endingMessage = `Winner! Congrats`;
      //add 1 to the counter
      tiktakWins += 1;
      break;
    //check if we lost
    case winCheck(gameState) === signs[0]:
      //if we did, make the message a losing message
      endingMessage = `Loser! Unlucky`;
      //add 1 to the counter
      tiktakLosses += 1;
      break;
    //if it was a tie,
    default:
      //change ending message to a tie
      endingMessage = `Tie!`;
      //add 1 to the counter
      tiktakTies += 1;
      break;
    //print the ending message`
  }
  //print ending message
  console.log(
    `${gameState.slice(0, 3).join(' ')}\n${gameState
      .slice(3, 6)
      .join(' ')}\n${gameState.slice(6, 9).join(' ')}`
  );
  console.log(endingMessage);
  //print Wins, Losses, and Ties
  console.log(
    `Wins: ${tiktakWins} Losses: ${tiktakLosses} Ties: ${tiktakTies}`
  );
  //ask if they'd like to play again
  //declare replayMsg as empty string
  let replayMsg = '';
  //declare variable for correct answers
  const answers = ['y', 'n'];
  //declare playAgain as an empty string "";
  let playAgain = '';
  //Create replay loop
  while (!answers.includes(playAgain)) {
    //print our message
    console.log(replayMsg);
    //ask if they would like to play again
    playAgain = readline.question(
      `${userName}, would you like to play again? (y,n) `
    );
    //check for their answer
    if (playAgain.toLowerCase() === 'y') {
      //if yes, run the function
      ttt(userName);
    } else if (playAgain.toLowerCase() !== 'n') {
      replayMsg = `Hey there ${userName}, input of ${playAgain} is invalid.`;
    }
  }
  //Print an exit message
  console.log(`Thanks for playing!! ^~^`);
}

ttt();

//helper function that returns which sign won the game, if no-one won yet, returns false
function winCheck(game) {
  //create switch statement for each winning combination
  switch (true) {
    case game[0] === game[3] && game[3] === game[6] && game[0] !== '-':
      //if they won, return the winning sign
      return game[0];
    case game[1] === game[4] && game[4] === game[7] && game[1] !== '-':
      return game[1];
    case game[2] === game[5] && game[5] === game[8] && game[2] !== '-':
      return game[2];
    case game[0] === game[1] && game[1] === game[2] && game[0] !== '-':
      return game[0];
    case game[3] === game[4] && game[4] === game[5] && game[3] !== '-':
      return game[3];
    case game[6] === game[7] && game[7] === game[8] && game[6] !== '-':
      return game[6];
    case game[0] === game[4] && game[4] === game[8] && game[0] !== '-':
      return game[0];
    case game[2] === game[4] && game[4] === game[6] && game[2] !== '-':
      return game[2];
  }
  //if no-one won, return false
  return false;
}

//helper function that properly converts numpad notation to a proper index
function convertNotation(input) {
  switch (true) {
    //if the input is ranging from 7-9
    case input >= 7 && input <= 9:
      // minus 7 to get an accurate index
      return input - 7;
    //if input is ranging from 4-6
    case input >= 4 && input <= 6:
      // minus 1 to get an accurate index
      return input - 1;
    //if input is ranging from 1-3
    case input >= 1 && input <= 3:
      //add 5 to get an accurate index
      return input + 5;
  }
}
module.exports = {
  ttt,
};
