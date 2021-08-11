/*
  The setDifficulty function is used to change the difficulty of the game
*/
function setDifficulty() {
  const readline = require("readline-sync");
  // Declare a constant variable called difficulty options and assign it an array with 3 options
  const difficultyOptions = ["legendary", "hard"];
  console.clear();
  // Declare a variable called currentDifficulty and assign it evaluated result of invoking keyInSelect method passing in difficulty options as an argument.
  let difficultyIndex = readline.keyInSelect(difficultyOptions, "Please select difficulty: ", { cancel: "easy" });
  if (difficultyIndex === -1) {
    return "easy";
  } else {
    return difficultyOptions[difficultyIndex];
  }
}

module.exports = setDifficulty;
