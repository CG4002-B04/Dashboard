const mongoose = require('mongoose')

const predictionSchema = new mongoose.Schema({
  positions: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true
    // enum: ['windows', 'pushback', 'rocket', 'elbow_lock', 'hair', 'scarecrow', 'zigzag', 'shouldershrug', 'logout']
  },
  syncdelay: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now //Current timestamp
  }
})

module.exports = mongoose.model('prediction', predictionSchema)