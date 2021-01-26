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
const runScript = require('./util/runScript')
mongoose.connect('mongodb://localhost:27017/CG4002_Dashboard', {userMongoclient: true, useNewUrlParser: true});
mongoose.Promise = global.Promise;
const SensorReading = sensorReading;
const Prediction = prediction;

app.use(cors());



// Parse the dancer data to its id and the name
function parseDancerData(dancerData) {
  let splitDancerData = dancerData.split('|');
  return {
          id: splitDancerData[1],
          name: splitDancerData[2]
        }
}

// Store the evaluation group data to MongoDB
function saveEvalGroup (danceMoves, syncDelay) {
  if (danceMoves[0] === danceMoves[1] && danceMoves[1] === danceMoves[2]) {      
    const eval = new evaluationGroup({
      action: danceMoves[0],
      syncdelay: (parseFloat(syncDelay)/1000),
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
      syncdelay: (parseFloat(syncDelay)/1000),
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
      syncdelay: (parseFloat(syncDelay)/1000),
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
      syncdelay: (parseFloat(syncDelay)/1000),
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
      syncdelay: (parseFloat(syncDelay)/1000),
      isCorrect: false
    });
    const eval2 = new evaluationGroup({
      action: danceMoves[1],
      syncdelay: (parseFloat(syncDelay)/1000),
      isCorrect: false
    });
    const eval3 = new evaluationGroup({
      action: danceMoves[2],
      syncdelay: (parseFloat(syncDelay)/1000),
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

// Saving the evaluation data to MongoDB
function saveEvalData(evalData) {
  let positions = evalData.positions.split(" ");
  let danceMoves = evalData.danceMoves.split(" ");
  let confidences = evalData.confidence.split(" ");
  let dancers = evalData.dancers.split(" ");

  const eval1 = new Prediction({
    position: positions[0],
    action: danceMoves[0],
    confidence: parseFloat(confidences[0]),
    syncdelay: (parseFloat(evalData.syncDelay) / 1000),
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
    confidence: parseFloat(confidences[1]),
    syncdelay: (parseFloat(evalData.syncDelay) / 1000),
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
    confidence: parseFloat(confidences[2]),
    syncdelay: (parseFloat(evalData.syncDelay) / 1000),
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

  saveEvalGroup(danceMoves, evalData.syncDelay);  
}

// Parsing the eval data
function parseEvalData(evalData) {
  let splitData = evalData.split('|');
  splitData[0] = splitData[0].substring(1);
  return {
          positions: splitData[0], // e.g. "1 2 3"
          danceMoves: splitData[1], // e.g. scarecrow hair zigzag
          confidence: splitData[2], // e.g. "0.9 0.8 0.85"
          syncDelay: splitData[3], // e.g. 0.1
          dancers: splitData[4] // e.g. Jack Jill John
        }
}

// Main logic that receives data from the dashboardserver, parse it and send it to the frontend
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
    } else if (data.includes("!S")) { //dancer initialization data 
      processedDancerData = parseDancerData(data);
      console.log(processedDancerData);
      io.sockets.emit('DancerData', processedDancerData);
    } 
  });

  /*
  socket.on('simulateEval', () => {
    runScript.runScript('./socket/evalClient.js');
    console.log('Running simulated evaluation data');
  })
  */

  socket.on('error', (err) => {
    console.log(err);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
})

server.listen(process.env.PORT || 5001, () => console.log(`Server has started at localhost:${process.env.PORT || 5001}`))