const mongoose = require('mongoose')

const predictionSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true
    
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
    type: Number
  }
})

module.exports = mongoose.model('prediction', predictionSchema, "predictions")