import React, { useState, useEffect } from 'react';
import './App.css';
import Chart from './components/Chart/Chart'; 
import io from "socket.io-client";

const ENDPOINT = 'http://localhost:5000';
let socket = io(ENDPOINT);

const maxNumberElements = 50;

function App() {
  const [gyroXData, setGyroXData] = useState(0);
  const [gyroYData, setGyroYData] = useState(0);
  const [gyroZData, setGyroZData] = useState(0);
  let counter = 0;
  console.log('render')

  
  useEffect(() => {
    socket.on('data', dataPoint => {
      console.log('incoming data');
      setGyroXData(gyroXData => dataPoint.gyroX);
      setGyroYData(gyroYData => dataPoint.gyroY);
      setGyroZData(gyroZData => dataPoint.gyroZ);
    })
  }, []);

  return (
    <div className="App">
      <Chart gyroXData={gyroXData} gyroYData={gyroYData} gyroZData={gyroZData} />
    </div>
  );
}

export default App;
