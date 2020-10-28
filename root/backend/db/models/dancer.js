const mongoose = require('mongoose')

const dancerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  accuracy: {
    type: Number
  },
  bestmove: {
    type: String,
  },
  worstmove: {
    type: String,
  },
  averageSyncDelay: {
    type: String,
  },
})

module.exports = mongoose.model('dancer', dancerSchema)
