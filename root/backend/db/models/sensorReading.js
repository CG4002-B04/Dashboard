const mongoose = require('mongoose')

const sensorReadingSchema = new mongoose.Schema({
  accelX: {
    type: Number,
    required: true,
  },
  accelY: {
    type: Number,
    required: true,
  },
  accelZ: {
    type: Number,
    required: true,
  },
  gyroX: {
    type: Number,
    required: true
  },
  gyroY: {
    type: Number,
    required: true
  },
  gyroZ: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now //Current timestamp
  }, 
  hand: {
    type: String,
    enum: ['right', 'left']
  },
  user: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('sensorreading', sensorReadingSchema)