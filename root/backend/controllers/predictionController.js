const Prediction = require('../db/models/prediction')

//The accuracy for every moves for a dancer
exports.move_accuracy_dancer = async function(req, res, next) {
  const dancerName = req.body.dancerName;
  const dances = ["windows", "pushback", "elbowlock", "rocket", "hair", "zigzag", "scarecrow", "shouldershrug"];
  console.log(dancerName)

  let accuracies = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  let correctCounts = [0,0,0,0,0,0,0,0];
  let incorrectCounts = [0,0,0,0,0,0,0,0];
  for (let i = 0; i < 8; i++) {
    correctCounts[i] = await Prediction.countDocuments({dancer: dancerName, isCorrect: true, action: dances[i]})
    incorrectCounts[i] = await Prediction.countDocuments({dancer: dancerName, isCorrect: false, action: dances[i]})
    if (correctCounts[i] + incorrectCounts[i] !== 0) {
      console.log(dances[i], "Correct: ", correctCounts[i])
      console.log(dances[i], "Incorrect: ", incorrectCounts[i])
      accuracies[i] = correctCounts[i] / (correctCounts[i] + incorrectCounts[i])
    }
  }
  console.log(accuracies);
  res.send(accuracies);
}