const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const mongoose = require('mongoose');
const sensorReading = require('./db/models/sensorReading');
const prediction = require('./db/models/prediction.js');
const evaluationGroup = require('./db/models/evaluationGroup');
mongoose.connect('mongodb://localhost:27017/CG4002_Dashboard', {userMongoclient: true});
mongoose.Promise = global.Promise;
const SensorReading = sensorReading;
const Prediction = prediction;

app.use(cors());

//TODO: Modularize the code

//split to acceleration data and gyro data
function parseSensorData(sensorData) {
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
          },
          splitData[15]
         ] 
}


function saveSensorData(accelData, gyroData, hand, dancer) {
  const reading = new SensorReading({
    accelX: parseInt(accelData.x),
    accelY: parseInt(accelData.y),
    accelZ: parseInt(accelData.z),
    gyroX: parseInt(gyroData.x),
    gyroY: parseInt(gyroData.y),
    gyroZ: parseInt(gyroData.z),
    hand: hand,
    dancer: dancer 
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


let processedAccelData1Left;
let processedGyroData1Left;
let processedAccelData1Right;
let processedGyroData1Right;
let processedAccelData2Left;
let processedGyroData2Left;
let processedAccelData2Right;
let processedGyroData2Right;
let processedAccelData3Left;
let processedGyroData3Left;
let processedAccelData3Right;
let processedGyroData3Right;
let processedEvalData;
let dancer1;
let dancer2;
let dancer3;

io.on('connect', (socket) => {
  console.log(`Socket ${socket.id} has just been connected`);
  
  socket.on('endpointData', (data) => {
    console.log(data);
    if (data.includes("!D|1|")) { //data from dancer 1
      [processedAccelData1Left, processedGyroData1Left, processedAccelData1Right, processedGyroData1Right, dancer1] = parseSensorData(data);
      io.sockets.emit('AccelerometerData1Left', processedAccelData1Left);
      io.sockets.emit('GyrometerData1Left', processedGyroData1Left);
      io.sockets.emit('AccelerometerData1Right', processedAccelData1Right);
      io.sockets.emit('GyrometerData1Right', processedGyroData1Right);
      //saveSensorData(processedAccelData1Left, processedGyroData1Left, 'left', dancer1);
      //saveSensorData(processedAccelData1Right, processedGyroData1Right, 'right', dancer1);
    } else if (data.includes("!D|2|")) { //data from dancer 2
      [processedAccelData2Left, processedGyroData2Left, processedAccelData2Right, processedGyroData2Right, dancer2] = parseSensorData(data);
      io.sockets.emit('AccelerometerData2Left', processedAccelData2Left);
      io.sockets.emit('GyrometerData2Left', processedGyroData2Left);
      io.sockets.emit('AccelerometerData2Right', processedAccelData2Right);
      io.sockets.emit('GyrometerData2Right', processedGyroData2Right);
      //saveSensorData(processedAccelData2Left, processedGyroData2Left, 'left', dancer2);
      //saveSensorData(processedAccelData2Right, processedGyroData2Right, 'right', dancer2);
    } else if (data.includes("!D|3|")) { //data from dancer 3
      [processedAccelData3Left, processedGyroData3Left, processedAccelData3Right, processedGyroData3Right, dancer3] = parseSensorData(data);
      io.sockets.emit('AccelerometerData3Left', processedAccelData3Left);
      io.sockets.emit('GyrometerData3Left', processedGyroData3Left);
      io.sockets.emit('AccelerometerData3Right', processedAccelData3Right);
      io.sockets.emit('GyrometerData3Right', processedGyroData3Right);
      //saveSensorData(processedAccelData3Left, processedGyroData3Left, 'left', dancer3)
      //saveSensorData(processedAccelData3Right, processedGyroData3Right, 'right', dancer3);
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