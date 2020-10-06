const mongoose = require('mongoose')

const dancerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  macaddress: {
    type: String,
    required: true,
  },
  accuracy: {
    type: Number
  },
  bestmove: {
    type: String,
    enum: ['windows', 'pushback', 'rocket', 'elbow_lock', 'hair', 'scarecrow', 'zigzag', 'shouldershrug', 'logout']
  },
  worstmove: {
    type: String,
    enum: ['windows', 'pushback', 'rocket', 'elbow_lock', 'hair', 'scarecrow', 'zigzag', 'shouldershrug', 'logout']
  }
})

module.exports = mongoose.model('dancer', dancerSchema)
