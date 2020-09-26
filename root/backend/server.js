const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

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
          }
         ] 
}

function processEvalData(evalData) {
  let splitData = evalData.split('|');
  splitData[0] = splitData[0].substring(1);
  return {
          positions: splitData[0],
          danceMoves: splitData[1],
          synchDelay: splitData[2]
        }
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
    if (data[0] == '#') {
      processedEvalData = processEvalData(data);
      io.emit('evalData', processedEvalData);
      console.log('evalData');
    } else if (data[3] == '0') {
      [processedAccelData1, processedGyroData1] = processSensorData(data);
      io.sockets.emit('AccelerometerData1', processedAccelData1);
      io.sockets.emit('GyrometerData1', processedGyroData1);
      console.log('data1');
    } else if (data[3] == '1') {
      [processedAccelData2, processedGyroData2] = processSensorData(data);
      io.sockets.emit('AccelerometerData2', processedAccelData2);
      io.sockets.emit('GyrometerData2', processedGyroData2);
      console.log('data2');
    } else if (data[3] == '2') {
      [processedAccelData3, processedGyroData3] = processSensorData(data);
      io.sockets.emit('AccelerometerData3', processedAccelData3);
      io.sockets.emit('GyrometerData3', processedGyroData3);
      console.log('data3');
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