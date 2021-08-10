const readline = require("readline-sync");

const dictionary = require("./dictionary");

const chalk = require("chalk");

//adds a hint of color to the file

let word = getRandomWord();
// This line of code gets a random word. The `word` variable will be a string.

let win = "🎊🥳You lived! Victory is yours!🥳🎊";
//winning message
  
let lose = "Game Over. You're DEAD!☠️";
//losing message
  
let invalid = '⛔Invalid Entry!⛔';
// invalid character entered
  
let repeat = '🚫 Sorry, you already guessed that.';
// letter repetition

let wrong = '❌ Sorry, Wrong answer.'

let right = '✅Great Job!'

let fool = `\nYou fool!🤡 Killer snowmen are on the loose.Every wrong letter is a step closer to death.\n\n Play at your own risk!😨\n\n`

let youSmart = `\nGood choice!💡 Killer snowmen are on the loose.Every wrong letter is a step closer to death.\n\n Good Luck!😨\n\n`

function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

const intro = readline.question(chalk.bgBlackBright(`☃️\nDo you want to build a snow man?☃️\n\n [y | n]: `));
//This is a intro to the game, Something to jazz it up a bit
if (intro === 'y'){
  //Ignore this. I just liked having the option to use both capital and lowercase.
  console.log(chalk.red(fool));
  run()

  //We added a run command because we noticed it would not continue
} else {
  console.log(chalk.green(youSmart));
  //The response is different because we feel passionate about this answer. 
  run ()
  }

function run(snowman) {
 
const underScore = []
//array that accounts for underscores

const guesses = []
//array that accounts for guesses

let validGuess = /^[a-z]+$/;
// Ensures selects letters only

for(let i= 0; i < word.length; i++){
  underScore[i] = '_' 
  // underscore will represent hidden letters in their entirety. 
} 

let remainingLetters = word.length;

let lives = 10 ;
while(remainingLetters > 0 && lives > 0){
// This is saying while letters and lives remain you can play 
  console.log(chalk.magenta(underScore.join(' '))); 
  //shows letters
  console.log(chalk.yellow(guesses.join(' ')));
  //shows guessed valid letters only
  console.log(`Lives: ${lives}`);
  //shows lives remaining
  const userInput = readline.question("Guess a letter: ");
  // Game play question Tells them to guess a letter 
  
  if (guesses.includes(userInput)){
    console.log(chalk.magentaBright(repeat));
    console.log("THE USER INPUTTED:", userInput);
    // This line of code will print out if user repeats guess
    continue //if user uses letters only 
  }
  
  if (!userInput.match(validGuess)){
    console.log(chalk.red(invalid))
    console.log("THE USER INPUTTED:", userInput);
    // This line of code will print out whatever is inputted in by the user.
    continue //if user uses letters only 
  }
  for(let i =0; i < word.length; i++){
    //checking if the letter is within the word.
    if(userInput === word[i]){
      underScore[i] = userInput
      // if its in the code it adds it to the array. Will go through entire word and account for double letters. 
      remainingLetters--
    }
  }
  guesses.push(userInput);
  //This line of code pushes guesses into array
  if (!word.includes(userInput)){
  lives--
  console.log(chalk.red(wrong))
  //if it is not in the array it is invalid and continue
  continue
  } else {
  console.log(chalk.green(right)) 
    //Shows correct response
    continue
    //returns to the game 
  } 
}
if (underScore.join("") === word) { // If the player won
    console.log(chalk.yellowBright(win)) // Offer a chance to continue
    console.log(chalk.blue(`The winning word was: ${word}.`))

    const newGame = readline.question(chalk.bgGreenBright(`Try again? \n\n [y|n]:`))

  if (newGame === 'y') { // If the player wishes to continue
    word = getRandomWord();
    //it needed a fuction within the scope for get random to restart the game with a new word
    console.log(`\nGood Luck Player!\n`)
    run()
  } else { // If No
    console.log(`\nThank you for playing!\n`)
    process.exit()
    //exits the game
  }
}
  let reTry = ""
  
if (lives === 0) { // If the player lost
    console.log(chalk.red(lose))
    console.log(chalk.blue(`The word was: ${word}.`))
   //allows to see the the word if lost
  } reTry = readline.question(chalk.bgGreenBright(`Try again? \n\n [y|n]:`))
  if (reTry === 'y') {
    word = getRandomWord();
      console.log(`\nGood Luck Player!\n`)
  } else {
    console.log(`\nThank you for playing!\n`)
    process.exit()
         
}
}
run();


/**

PSEUDO CODE IDEAS

  Alternate Question before game: 
  
  Do You want to build a snow man?

  if yes = "Warning, man eating snow man ahead. If you build a snow man you will die"

  else No = "Smart choice. Warning, man eating snowman ahead. If you build a snow man you will die. Good Luck!"

  If else statements

   *  - 'If Guess !== Incorrect keep going
   *     else return number of chances until zero' (This keeps score)
   *  - If 10 guesses stays the same
   *     else count -1 
   *    If guesses 0 returns "You lose"
   *    If guesses correct shows correct
   *    If guesses all correct "Congrats you won"
  
   * it should account for multiple letters
  
   * Should account for capitals and lower cases.
   
   *  ReGex SnowMan.ValidGuess = /[a-zA-Z]; 
  
   * Return Error message if number/not letter entered.
  
   * Add in underscore for blank spaces that match length.
   
   * Something that tells them what they already guessed. 
  
   * If guessing same letter return error.
  
   * If same letter is guessed count stays the same. 
  
   * If guess wrong letter twice doesn't take away returns error.
 
   * need .toUpperCase
   
   * .split([,]) - to break up letters
  
   * Loop to start and end the game keep doing it until it ends number
   
   * At the end of the game it should restart file. 

GAME STEPS: 

1. Intro message

2. Game displays hidden letters. 

3. Tell user they have 10 guesses. 

4. Game invites user to guess letters. 

5. Regex should check for valid entry if Valid play. If invalid alert invalid entry return to start question. 

6. Game alerts user to correct or incorrect answer.Game alerts user if something is a repeat selection.

7. Game displays guesses on screen. 

8. Game revals correct letters. 

9. Game accepts duplicate correct answers.  

11. Game alerts if incorrect answer deducting a point.

12. Game Loops until win or lose. 
/*
   PLAN TO CODE:

  STEP ONE: Create a WHILE LOOP that keeps track of guesses. Pertaining to Right and wrong answers. 
  Should say, while the answer is not incorrect & the wrong answers are less than or equal to 10 keep going. Should also account for previous wrong answers as this statement remains true. 
  OR ELSE:Return the answer is incorrect subtracting from the loop until it reaches zero. 

  STEP TWO: Create a condition for winning and losing. 
  If the count reaches 0 then Game Over you lose Return losing message. 
  If the answers are all correct then you win. Return winning message.  

  STEP THREE: Create a function that remembers previous guesses. 
  Should if already guessed should return error message that reports as such. 
  This should not subtract from points so probably should create some kind of guard for that edge case.

  STEP FOUR: Create a function that covers correct answers to the length of the entire word. Should allow user to guess until ready. *THIS MIGHT NOT BE NEEDED* 

  STEP FIVE: Should be able to push entire word from dictionary to hidden word. Should also push a random word each time. 

  STEP SIX: Create a loop that starts and ends the game. Should always return welcome selection at the beginning of the game and should always present a win/lose option looping to beginning When the game is finished.

  STEP SEVEN: Create a function or statement that accounts for repeated letters. This might be a string of some sort. May also be attached to the hidden words

  STEP EIGHT: Create a string of hidden letters that loop through the the word to find if its correct? I’m not sure if this is the right thing to do but the idea is if the words are correct      the letters should replace the under-score otherwise remain      the same. This would def include a .split([,]) array method to break up the letters. 

  STEP NINE: SELECTED LETTERS SHOULD BE CAPPED

Snowman Game Plan (As per Collin's request)
1. Introduction to game
2. Underscores will be displayed
3. Number of lives will be displayed
4. User can guess a letter.

CONDITIONALS:

1. While the user guesses correctly, score is not impacted. If the user guesses incorrectly, the score is deducted by 1 and lets the user continue playing as long as the user the score is above 0, the user can continue playing. If the user guesses the word, return winning message. If the score is 0, return losing message . Displays the word, and starts the game from the beginning with a new word and score starts again at 10.

ERROR MESSAGES:
If the user enters an invalid character. (I.e. numbers, special characters, etc.) Or if user enters more than one character, returns invalid entry (for both cases). Still returns to the game. Score is not impacted by error messages.
If the user enters a letter that was already guessed, they will receive an error message and can continue playing. Score will not be impacted by this.  
*/

