const mongoose = require('mongoose')

// Overall accuracy = identified dances (2 out of 3 or more) / (identified dances + nomatch + wrong (all the dances are different))
// You can't merge NoMatch and Wrong together
// Because Accuracy of Dance = Num of Correct (2 out of 3 or more) / Num of Wrong (1 out of 3) + Num of Correct

const evaluationGroupSchema = new mongoose.Schema({
  action: { // If all the dances are different, you input 3 entries, one for each dance move
    type: String,
    required: true,
  },
  syncdelay: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now //Current timestamp
  },
  isCorrect: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('evaluationGroup', evaluationGroupSchema)