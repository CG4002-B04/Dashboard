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

function parseEvalData(evalData) {
  let splitData = evalData.split('|');
  splitData[0] = splitData[0].substring(1);
  return {
          positions: splitData[0], // e.g. "1 2 3"
          danceMoves: splitData[1], // e.g. scarecrow hair zigzag
          confidence: splitData[2], // e.g. "0.9 0.8 0.85"
          syncDelay: parseFloat(splitData[3]), // e.g. 0.1
          dancers: splitData[4] // e.g. Jack Jill John
        }
}

function parseDancerData(dancerData) {
  let splitDancerData = dancerData.split('|');
  return {
          id: splitDancerData[1],
          name: splitDancerData[2]
        }
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

// Whether a dancer's move is correct is determined by 2 things:
// 1. If at least another person is dancing the same thing (at least 2 out of 3 dances the same thing)
// 2. If it's NoMatch, it's always incorrect
function checkDanceMoveCorrect(move, danceMoves) {
  if (move === "NoMatch") return false;
  if (move === danceMoves[0] && danceMoves[0] === danceMoves[1] && danceMoves[1] === danceMoves[2]) {
    return true;
  } else if (move === danceMoves[0] && danceMoves[0] === danceMoves[1] && danceMoves[1] !== danceMoves[2]) {
    return true;
  } else if (move === danceMoves[0] && danceMoves[0] === danceMoves[2] && danceMoves[2] !== danceMoves[1]) {
    return true;
  } else if (move === danceMoves[1] && danceMoves[1] === danceMoves[2] && danceMoves[2] !== danceMoves[0]) {
    return true;
  } else {
    //all dance moves are different
    return false;
  }
}

//TODO: Duplicate calculation of syncdelay if all three are not the same
function saveEvalGroup (danceMoves, syncDelay) {
  if (danceMoves[0] === danceMoves[1] && danceMoves[1] === danceMoves[2]) {      
    const eval = new evaluationGroup({
      action: danceMoves[0],
      syncdelay: syncDelay,
      isCorrect: true 
    });
    eval.save((err, results) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log('Saved SaveEvalGroup: ', results);
    }
    })

  } else if (danceMoves[0] === danceMoves[1] && danceMoves[1] !== danceMoves[2]) {
    const eval = new evaluationGroup({
      action: danceMoves[0],
      syncdelay: syncDelay,
      isCorrect: true 
    })
    eval.save((err, results) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log('Saved SaveEvalGroup: ', results);
    }
    })
  } else if (danceMoves[0] === danceMoves[2] && danceMoves[2] !== danceMoves[1]) {
    const eval = new evaluationGroup({
      action: danceMoves[0],
      syncdelay: syncDelay,
      isCorrect: true 
    })
    eval.save((err, results) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log('Saved SaveEvalGroup: ', results);
    }
    })
  } else if (danceMoves[1] === danceMoves[2] && danceMoves[2] !== danceMoves[0]) {
    const eval = new evaluationGroup({
      action: danceMoves[1],
      syncdelay: syncDelay,
      isCorrect: true 
    })
    eval.save((err, results) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log('Saved SaveEvalGroup: ', results);
    }
    })
  } else {
    //all dance moves are different, mark them all as incorrect and insert them into the database
    const eval1 = new evaluationGroup({
      action: danceMoves[0],
      syncdelay: syncDelay,
      isCorrect: false
    });
    const eval2 = new evaluationGroup({
      action: danceMoves[1],
      syncdelay: syncDelay,
      isCorrect: false
    });
    const eval3 = new evaluationGroup({
      action: danceMoves[2],
      syncdelay: syncDelay,
      isCorrect: false
    });
    eval1.save((err, results) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log('Saved SaveEvalGroup: ', results);
    }
    })
    eval2.save((err, results) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log('Saved SaveEvalGroup: ', results);
    }
    })
    eval3.save((err, results) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log('Saved SaveEvalGroup: ', results);
    }
    })
  }
}

// TODO: Refactor to smaller functions
function saveEvalData(evalData) {
  let positions = evalData.positions.split(" ");
  let danceMoves = evalData.danceMoves.split(" ");
  let confidences = evalData.confidence.split(" ");
  let dancers = evalData.dancers.split(" ");

  const eval1 = new Prediction({
    position: positions[0],
    action: danceMoves[0],
    confidence: confidences[0],
    syncdelay: parseFloat(evalData.syncDelay),
    dancer: dancers[0],
    isCorrect: checkDanceMoveCorrect(danceMoves[0], danceMoves)
  });
  eval1.save((err, results) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log('Saved Eval1: ', results);
    }
  })

  const eval2 = new Prediction({
    position: positions[1],
    action: danceMoves[1],
    confidence: confidences[1],
    syncdelay: parseFloat(evalData.syncDelay),
    dancer: dancers[1],
    isCorrect: checkDanceMoveCorrect(danceMoves[1], danceMoves)
  });
  eval2.save((err, results) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log('Saved Eval2: ', results);
    }
  })

  const eval3 = new Prediction({
    position: positions[2],
    action: danceMoves[2],
    confidence: confidences[2],
    syncdelay: parseFloat(evalData.syncDelay),
    dancer: dancers[2],
    isCorrect: checkDanceMoveCorrect(danceMoves[2], danceMoves)
  });
  eval3.save((err, results) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log('Saved Eval3: ', results);
    }
  })

  saveEvalGroup(danceMoves, parseFloat(evalData.syncDelay));

  
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
    if (data.includes("#")) { //evaluation data
      processedEvalData = parseEvalData(data);
      console.log('evalData');
      console.log(processedEvalData);
      io.sockets.emit('evalData', processedEvalData);
      saveEvalData(processedEvalData);
    } else if (data.includes("!D|1|")) { //data from dancer 1
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
    } else if (data.includes("!S")) { //dancer initialization data 
      processedDancerData = parseDancerData(data);
      console.log(processedDancerData);
      io.sockets.emit('DancerData', processedDancerData);
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