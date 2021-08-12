//import our game functions
const { run } = require('./snowman');
const { ttt } = require('./tiktak');
//importing(?) the the readline library
const readline = require('readline-sync');

//function to keep things global between the games
function gameHub() {
  //Ask for a username
  let userName = readline.question('Enter your username: ') || 'User';

  //declare startMsg as empty string
  let startMsg = '';
  //declare variable for correct answers
  const startAnswers = ['1', '2'];
  //declare gameChoice as an empty string "";
  let gameChoice = '';
  //Create startup loop
  while (!startAnswers.includes(gameChoice)) {
    //print our message
    console.log(startMsg);
    //print our options
    console.log(`1: Snowman\n2: Tik Tac Toe`);
    //Ask for the game they'd like to play
    gameChoice = readline.question('Choose your game! (1 or 2): ');
    //check their game choice
    switch (gameChoice) {
      //if it's 1, run snowman
      case '1':
        run(userName);
        break;
      // if it's 2, run tiktak
      case '2':
        ttt(userName);
        break;
      //if they didn't input 1 or 2, let them know in our message
      default:
        startMsg = `${userName}, your input of '${gameChoice}' is invalid. Please try again.`;
    }
  }
  //Print an exit message
  console.log(`Thanks for playing!! ^~^`);
}
gameHub();
