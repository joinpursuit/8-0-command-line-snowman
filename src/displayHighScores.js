function displayHighScores() {
  /*
  `fs(file-sync)` is a library that allows you to import from files. The library is assigned to the variable `fileSync`.
*/
  const fileSync = require("fs");
  //declare a constant variable called scores to get highScores Obj
  const scores = JSON.parse(fileSync.readFileSync("./src/allTimeHighScores.json"));

  console.log("☃️ SNOW MAN HIGH SCORES ☃️");
  //iterate through scores one by one and format the display to show up a certain way
  scores.topScores.forEach((score, index) => {
    console.log(`       ${index + 1}) ` + scores.names[index], score);
  });
}

module.exports = displayHighScores;
