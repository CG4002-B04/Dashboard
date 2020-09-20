const mongoose = require('mongoose')

const predictionSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
    enum: ['windows', 'pushback', 'rocket', 'elbow_lock', 'hair', 'scarecrow', 'zigzag', 'shouldershrug', 'logout']
  },
  syncdelay: {
    type: String,
    required: true
  }
})