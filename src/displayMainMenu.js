/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");
/*
  The `logSnowMan` variable is a function that when invoked will log a snowman to the console
*/
const logSnowMan = require("./logSnowMan.js");

function displayMainMenu(name) {
  //This line of code will be used to give the player the option to play the game or read rules
  const options = ["Play Snowman Game", "Read Rules", "View High Scores"];

  logSnowMan();
  console.log(`☃️  Welcome To Snowman, ${name}! ☃️\n\n`);
  let index = readline.keyInSelect(options, "What would you like to do?");
  //until user selects play the game
  while (options[index] !== "Play Snowman Game") {
    if (options[index] === "Read Rules") {
      console.clear();
      console.log(
        "Snowman is a simple word guessing game. Players try to figure out an unknown word by guessing letters.\nIn order to win, the player must at least have 1 remaining try when figuring out the unknown word.\nIf the player guesses incorrectly, they lose a try and once they lose all tries the game is over.\n"
      );
      readline.question("Hit Enter key to continue.", { hideEchoBack: true, mask: "" });
      console.clear();
      index = readline.keyInSelect(options, "What would you like to do now?");
    } else if (options[index] === "View High Scores") {
      console.clear();
      console.log("High Scores");
      readline.question("Hit Enter key to continue.", { hideEchoBack: true, mask: "" });
      console.clear();
      index = readline.keyInSelect(options, "What would you like to do now?");
    } else {
      process.exit();
    }
  }
}

module.exports = displayMainMenu;
