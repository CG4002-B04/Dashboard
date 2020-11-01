const mongoose = require('mongoose')

// Accuracy, Top confusing moves, Best moves, Graph of all the moves, Average Sync Delay, Confidence 
// Differentiate between NoMatch and not enough moves
const predictionSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true
    // enum: ['windows', 'pushback', 'rocket', 'elbow_lock', 'hair', 'scarecrow', 'zigzag', 'shouldershrug']
  },
  syncdelay: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now //Current timestamp
  },
  dancer: {
    type: String,
    default: "Unknown"
  },
  isCorrect: {
    type: Boolean,
    default: false
  },
  confidence: {
    type: String
  }
})

module.exports = mongoose.model('prediction', predictionSchema, "predictions")