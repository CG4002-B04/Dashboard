const Prediction = require('../db/models/prediction')

//The accuracy for every moves for a dancer
exports.move_accuracy_dancer = async function(req, res, next) {
  const dancerName = req.body.dancerName;
  const dances = ["windows", "pushback", "elbowlock", "rocket", "hair", "zigzag", "scarecrow", "shouldershrug"];

  let accuracies = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  let correctCounts = [0,0,0,0,0,0,0,0];
  let incorrectCounts = [0,0,0,0,0,0,0,0];
  for (let i = 0; i < 8; i++) {
    correctCounts[i] = await Prediction.countDocuments({dancer: dancerName, isCorrect: true, action: dances[i]})
    incorrectCounts[i] = await Prediction.countDocuments({dancer: dancerName, isCorrect: false, action: dances[i]})
    if (correctCounts[i] + incorrectCounts[i] !== 0) {
      //console.log(dances[i], "Correct: ", correctCounts[i])
      //console.log(dances[i], "Incorrect: ", incorrectCounts[i])
      accuracies[i] = correctCounts[i] / (correctCounts[i] + incorrectCounts[i])
    }
  }
  console.log(accuracies);
  res.status(200).send({moveAccuracyDancer: accuracies});
}

exports.accuracy_dancer = async function (req, res, next) {
  const dancerName = req.body.dancerName;
  let accuracy = 0.0
  correctCount = await Prediction.countDocuments({dancer: dancerName, isCorrect: true});
  incorrectCount = await Prediction.countDocuments({dancer: dancerName, isCorrect: false});
  if (correctCount + incorrectCount !== 0) {
    accuracy = correctCount / (incorrectCount + correctCount);
  }
  //cannot send number
  res.status(200).send({accuracyDancer: accuracy});
}

// need to convert from string to float
exports.sync_delay_dancer = async function (req, res, next) {
  const dancerName = req.body.dancerName;
  let avg_delay = await Prediction.aggregate([
                        {
                          $match : {
                            dancer: dancerName
                          }
                        },
                        {
                          $group: {
                            _id: null,
                            avgDelay: { 
                              $avg: "$syncdelay"
                            }
                          }
                        }
                        ]) 
  res.status(200).send({accuracyDancer: avg_delay});
}