const Prediction = require('../db/models/prediction')

//The accuracy for every moves for a dancer
exports.move_accuracy_dancer = async function(req, res, next) {
  const dancerName = req.query.dancerName;
  
  const dancesAccuracies = [["windowwipe", 0.0], ["pushback", 0.0], ["elbowlock", 0.0], ["rocket", 0.0], ["hair", 0.0], 
                            ["zigzag", 0.0], ["scarecrow", 0.0], ["shouldershrug", 0.0]]
  let accuracies = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  let correctCounts = [0,0,0,0,0,0,0,0];
  let incorrectCounts = [0,0,0,0,0,0,0,0];
  for (let i = 0; i < 8; i++) {
    correctCounts[i] = await Prediction.countDocuments({dancer: dancerName, isCorrect: true, action: dancesAccuracies[i][0]})
    incorrectCounts[i] = await Prediction.countDocuments({dancer: dancerName, isCorrect: false, action: dancesAccuracies[i][0]})
    if (correctCounts[i] + incorrectCounts[i] !== 0) {
      dancesAccuracies[i][1] = parseInt((correctCounts[i] / (correctCounts[i] + incorrectCounts[i])) * 100) 
      accuracies[i] = parseInt((correctCounts[i] / (correctCounts[i] + incorrectCounts[i])) * 100) 
    }
  }
  console.log(dancesAccuracies);
  res.status(200).send({accuracies: accuracies,
                        ascDances: dancesAccuracies.sort((a, b) => a[1] - b[1])});
}

exports.accuracy_dancer = async function (req, res, next) {
  const dancerName = req.query.dancerName;
  let accuracy = 0.0
  correctCount = await Prediction.countDocuments({dancer: dancerName, isCorrect: true});
  incorrectCount = await Prediction.countDocuments({dancer: dancerName, isCorrect: false});
  if (correctCount + incorrectCount !== 0) {
    accuracy = correctCount / (incorrectCount + correctCount);
  }
  console.log(dancerName, "accuracy", accuracy);
  //cannot send number
  res.status(200).send({accuracyDancer: accuracy});
}

exports.sync_delay_dancer = async function (req, res, next) {
  console.log(req.body)
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
  res.status(200).send({syncDelay: avg_delay[0].avgDelay});
}


exports.move_accuracy_overall = async function(req, res, next) {
  const dancesAccuracies = [["windowwipe", 0.0], ["pushback", 0.0], ["elbowlock", 0.0], ["rocket", 0.0], ["hair", 0.0], 
                            ["zigzag", 0.0], ["scarecrow", 0.0], ["shouldershrug", 0.0]]
  let accuracies = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  let correctCounts = [0,0,0,0,0,0,0,0];
  let incorrectCounts = [0,0,0,0,0,0,0,0];
  for (let i = 0; i < 8; i++) {
    correctCounts[i] = await Prediction.countDocuments({isCorrect: true, action: dancesAccuracies[i][0]})
    incorrectCounts[i] = await Prediction.countDocuments({isCorrect: false, action: dancesAccuracies[i][0]})
    if (correctCounts[i] + incorrectCounts[i] !== 0) {
      //console.log(dances[i], "Correct: ", correctCounts[i])
      //console.log(dances[i], "Incorrect: ", incorrectCounts[i])
      dancesAccuracies[i][1] = parseInt((correctCounts[i] / (correctCounts[i] + incorrectCounts[i])) * 100) 
      accuracies[i] = parseInt((correctCounts[i] / (correctCounts[i] + incorrectCounts[i])) * 100) 
    }
  }
  console.log(dancesAccuracies);
  res.status(200).send({accuracies: accuracies,
                        ascDances: dancesAccuracies.sort((a, b) => a[1] - b[1])});
}

exports.accuracy_overall = async function (req, res, next) {
  let accuracy = 0.0
  correctCount = await Prediction.countDocuments({isCorrect: true});
  incorrectCount = await Prediction.countDocuments({isCorrect: false});
  if (correctCount + incorrectCount !== 0) {
    accuracy = correctCount / (incorrectCount + correctCount);
  }
  console.log("accuracy", accuracy);
  //cannot send number
  res.status(200).send({accuracy: accuracy});
}

// need to convert from string to float
exports.sync_delay_overall = async function (req, res, next) {
  let avg_delay = await Prediction.aggregate([
                        {
                          $group: {
                            _id: null,
                            avgDelay: { 
                              $avg: "$syncdelay"
                            }
                          }
                        }
                        ]) 
  res.status(200).send({syncDelay: avg_delay[0].avgDelay});
}