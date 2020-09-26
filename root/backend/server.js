const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

function processData(sensorData) {
  let splitData = sensorData.split(',');
  return {
          accelX: splitData[0],
          accelY: splitData[1],
          accelZ: splitData[2],
          gyroX: splitData[3], 
          gyroY: splitData[4], 
          gyroZ: splitData[5]
        }
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

io.on('connect', (socket) => {
  console.log(`Socket ${socket.id} has just been connected`);
  
  socket.on('endpointData', (data) => {
    console.log('received data');
    console.log(data);
    let processedData = processData(data);
    io.emit('data', processedData);
  });

  socket.on('endpointEvalData', (data) => {
    console.log('received evalData');
    let processedData = processEvalData(data);
    console.log(processedData);
    io.emit('evalData', processedData);
  })

  socket.on('error', (err) => {
    console.log(err);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
})

server.listen(process.env.PORT || 5000, () => console.log(`Server has started`));