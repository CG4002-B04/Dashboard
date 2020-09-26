const mongoose = require('mongoose')
const sensorReading = require('../models/sensorReading')
const io = require('socket.io-client')

mongoose.connect('mongodb://localhost:27017/CG4002_Dashboard', {userMongoClient: true})
mongoose.Promise = global.Promise;
const SensorReading = sensorReading;

const ENDPOINT = 'http://localhost:5000';
let socket = io(ENDPOINT);

socket.on('data', dataPoint => {
  const reading = new SensorReading({
    accelX: parseInt(dataPoint.accelX),
    accelY: parseInt(dataPoint.accelY),
    accelZ: parseInt(dataPoint.accelZ),
    gyroX: parseInt(dataPoint.gyroX),
    gyroY: parseInt(dataPoint.gyroY),
    gyroZ: parseInt(dataPoint.gyroZ),
    hand: 'right',
    user: 'anon'
  });
  reading.save((err, results) => {
    if (err) {
    console.error(err);
    process.exit(1);
    } else {
    console.log('Saved: ', results);
    // process.exit(0);
    }
  });
})

