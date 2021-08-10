function updateAllTimeHighScores(name, currentSessionScore) {
  /*
  `fs(file-sync)` is a library that allows you to import from files. The library is assigned to the variable `fileSync`.
*/
  const fileSync = require("fs");
  //declare a constant variable called scores to get highScores Obj
  const scores = JSON.parse(fileSync.readFileSync("./src/allTimeHighScores.json"));

  //iterate through topScores
  for (let i = 0; i < scores.topScores.length; i++) {
    //if currentSession is greater than current index
    if (currentSessionScore > scores.topScores[i]) {
      console.log(`YOUR SCORE HAS PUT YOU IN HIGHSCORES!!\nCongratulations! ${name} with a score of ${currentSessionScore}!\nFeel free to check the highscores in the Main Menu.`);
      //remove last index in topScores and names
      scores.topScores.pop();
      scores.names.pop();
      //insert currentSessionScore and name in the specific index
      scores.topScores.splice(i, 0, currentSessionScore);
      scores.names.splice(i, 0, name);
      fileSync.writeFileSync("./src/allTimeHighScores.json", JSON.stringify(scores));
      break;
    }
  }
}

module.exports = updateAllTimeHighScores;
