const mongoose = require('mongoose')

const predictionSchema = new mongoose.Schema({
  positions: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true
    // enum: ['windows', 'pushback', 'rocket', 'elbow_lock', 'hair', 'scarecrow', 'zigzag', 'shouldershrug']
  },
  syncdelay: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now //Current timestamp
  },
  dancer: {
    type: String,
    default: "Unknown"
  }
})

module.exports = mongoose.model('prediction', predictionSchema)