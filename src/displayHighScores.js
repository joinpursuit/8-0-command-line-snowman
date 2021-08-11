/*
  The goal of this function is to display all of the highscores for the user to see at the same time
*/
function displayHighScores() {
  /*
  `fs(file-sync)` is a library that allows you to import from files. The library is assigned to the variable `fileSync`.
  */
  const fileSync = require("fs");
  //declare a constant variable called scores to get highScores Obj
  const scoresEasy = JSON.parse(fileSync.readFileSync("./src/highScores/allTimeHighScoresEasy.json"));
  const scoresHard = JSON.parse(fileSync.readFileSync("./src/highScores/allTimeHighScoresHard.json"));
  const scoresLegendary = JSON.parse(fileSync.readFileSync("./src/highScores/allTimeHighScoresLegendary.json"));

  console.log(`☃️ SNOW MAN HIGH SCORES LEGENDARY MODE ☃️`);
  //iterate through scoresLegendary one by one and format the display to show up a certain way
  scoresLegendary.topScores.forEach((score, index) => {
    console.log(`           ${index + 1}) ` + scoresLegendary.names[index], score);
  });

  console.log(`\n☃️ SNOW MAN HIGH SCORES HARD MODE ☃️`);
  //iterate through scoresHard one by one and format the display to show up a certain way
  scoresHard.topScores.forEach((score, index) => {
    console.log(`           ${index + 1}) ` + scoresHard.names[index], score);
  });

  console.log(`\n☃️ SNOW MAN HIGH SCORES EASY MODE ☃️`);
  //iterate through scoresEasy one by one and format the display to show up a certain way
  scoresEasy.topScores.forEach((score, index) => {
    console.log(`           ${index + 1}) ` + scoresEasy.names[index], score);
  });
}

module.exports = displayHighScores;
