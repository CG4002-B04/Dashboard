import React, { useState, useEffect } from 'react';
import './App.css';
import Chart from './components/Chart/Chart'; 
import io from "socket.io-client";

const ENDPOINT = 'http://localhost:5000';
let socket = io(ENDPOINT);

function App() {
  const [gyroXData, setGyroXData] = useState([]);
  const [gyroYData, setGyroYData] = useState([]);
  const [gyroZData, setGyroZData] = useState([]);
  let counter = 0;
  useEffect(() => {
    socket.on('data', dataPoint => {
      setGyroXData(gyroXData => [...gyroXData, {x: counter, y: parseInt(dataPoint.gyroX)}])
      setGyroYData(gyroYData => [...gyroYData, {x: counter, y: parseInt(dataPoint.gyroY)}])
      setGyroZData(gyroZData => [...gyroZData, {x: counter, y: parseInt(dataPoint.gyroZ)}])
      counter++;
    })
  }, []);

  return (
    <div className="App">
      <Chart gyroXData={gyroXData} gyroYData={gyroYData} gyroZData={gyroZData} />
    </div>
  );
}

export default App;
