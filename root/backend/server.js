const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const mongoose = require('mongoose');
const sensorReading = require('./db/models/sensorReading');
const prediction = require('./db/models/prediction.js')
mongoose.connect('mongodb://localhost:27017/CG4002_Dashboard', {userMongoclient: true});
mongoose.Promise = global.Promise;
const SensorReading = sensorReading;
const Prediction = prediction;

app.use(cors());

//split to acceleration data and gyro data
function processSensorData(sensorData) {
  let splitData = sensorData.split('|');
  return [{
            x: splitData[2],
            y: splitData[3],
            z: splitData[4]
          },
          {
            x: splitData[5], 
            y: splitData[6], 
            z: splitData[7]
          },
          {
            x: splitData[8],
            y: splitData[9],
            z: splitData[10]
          },
          {
            x: splitData[11],
            y: splitData[12],
            z: splitData[13]
          }
         ] 
}

function processEvalData(evalData) {
  let splitData = evalData.split('|');
  splitData[0] = splitData[0].substring(1);
  return {
          positions: splitData[0],
          danceMoves: splitData[1],
          syncDelay: splitData[2]
        }
}

function saveSensorData(accelData, gyroData, hand, user) {
  const reading = new SensorReading({
    accelX: parseInt(accelData.x),
    accelY: parseInt(accelData.y),
    accelZ: parseInt(accelData.z),
    gyroX: parseInt(gyroData.x),
    gyroY: parseInt(gyroData.y),
    gyroZ: parseInt(gyroData.z),
    hand: hand,
    user: user
  });
  reading.save((err, results) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log('Saved: ', results);
    }
  })
}

function saveEvalData(evalData) {
  let splitActions = evalData.danceMoves.split(" ");
  const eval = new Prediction({
    positions: evalData.positions,
    action: splitActions[0],
    syncdelay: evalData.syncDelay
  });
  eval.save((err, results) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log('Saved: ', results);
    }
  })
}

let processedAccelData1;
let processedGyroData1;
let processedAccelData2;
let processedGyroData2;
let processedAccelData3;
let processedGyroData3;
let processedEvalData;

io.on('connect', (socket) => {
  console.log(`Socket ${socket.id} has just been connected`);
  
  socket.on('endpointData', (data) => {
    console.log(data);
    if (data[0] == '#') { //evaluation data
      processedEvalData = processEvalData(data);
      io.emit('evalData', processedEvalData);
      saveEvalData(processedEvalData);
      console.log('evalData');
    } else if (data[3] == '0') { //data from sensor 1
      [processedAccelData1, processedGyroData1] = processSensorData(data);
      io.sockets.emit('AccelerometerData1', processedAccelData1);
      io.sockets.emit('GyrometerData1', processedGyroData1);
      saveSensorData(processedAccelData1, processedGyroData1, 'right', 'Alyssa');
    } else if (data[3] == '1') { //data from sensor 2
      [processedAccelData2, processedGyroData2] = processSensorData(data);
      io.sockets.emit('AccelerometerData2', processedAccelData2);
      io.sockets.emit('GyrometerData2', processedGyroData2);
      saveSensorData(processedAccelData2, processedGyroData2, 'left', 'Chris');
    } else if (data[3] == '2') { //data from sensor 3
      [processedAccelData3, processedGyroData3] = processSensorData(data);
      io.sockets.emit('AccelerometerData3', processedAccelData3);
      io.sockets.emit('GyrometerData3', processedGyroData3);
      saveSensorData(processedAccelData3, processedGyroData3, 'right', 'James');
    }
  });

  socket.on('error', (err) => {
    console.log(err);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
})

server.listen(process.env.PORT || 5000, () => console.log(`Server has started`));