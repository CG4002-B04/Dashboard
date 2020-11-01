const Prediction = require('../db/models/prediction')
const aync = require('async')

const { body, validationResult } = require('express-validator')

//The accuracy for every moves for a dancer
exports.move_accuracy_dancer = function(req, res, next) {
  const dancerName = req.body.dancerName;
  const dances = ["windows", "pushback", "elbowlock", "rocket", "hair", "zigzag", "scarecrow", "shouldershrug"];
  console.log(dancerName)

  let accuracies = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  //let correctCounts = [0,0,0,0,0,0,0,0];
  //let incorrectCounts = [0,0,0,0,0,0,0,0];
  /*
  async.parallel({
      windows: function (callback) {
        Prediction.countDocuments({dancer: dancerName, isCorrect: true, action: "windows"})
      }
  })
  */
 /*
  Prediction.find().exec(function (err, result) {
    if (err) { return next (err); }
    console.log('finding predictions')
    console.log(result);
  })
  */
  let correctCount = 0;
  let incorrectCount = 0;
  for (let i = 0; i < 8; i++) {
    correctCount = 0; incorrectCount = 0;
    Prediction.countDocuments({dancer: dancerName, isCorrect: true, action: dances[i]})
                               .exec(function (err, count) {
                                 if (err) { return next (err); }
                                 correctCount = count 
                               });
    Prediction.countDocuments({dancer: dancerName, isCorrect: false, action: dances[i]})
                               .exec(function (err, count) {
                                 if (err) { return next(err);}
                                 incorrectCount = count
                               })
    console.log(dances[i], 'correct: ', correctCount)
    console.log(dances[i], 'incorrect: ', incorrectCount)
    if (correctCount + incorrectCount !== 0) {
      console.log('hello')
      accuracies[i] = correctCount / (correctCount + incorrectCount)
    }
  }
  console.log(accuracies);
  res.send();
}