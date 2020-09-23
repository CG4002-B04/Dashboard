import React, { useState, useEffect } from 'react';
import './App.css';
import Chart from './components/Chart/Chart'; 
import io from "socket.io-client";

const ENDPOINT = 'http://localhost:5000';
let socket = io(ENDPOINT);

const maxNumberElements = 50;

function App() {
  const [gyroXData, setGyroXData] = useState([]);
  const [gyroYData, setGyroYData] = useState([]);
  const [gyroZData, setGyroZData] = useState([]);
  let counter = 0;
  useEffect(() => {
    socket.on('data', dataPoint => {
      if (counter > maxNumberElements) {
        setGyroXData(gyroXData => {
                      gyroXData.shift();
                      return [...gyroXData, {x: new Date(), y: parseInt(dataPoint.gyroX)}];
                    });
        
        setGyroYData(gyroYData => {
                      gyroYData.shift();
                      return [...gyroYData, {x: new Date(), y: parseInt(dataPoint.gyroY)}];
                    });
        
        setGyroZData(gyroZData => {
                      gyroZData.shift();
                      return [...gyroZData, {x: new Date(), y: parseInt(dataPoint.gyroZ)}];
                    });
      } else {
        counter++;
        setGyroXData(gyroXData => [...gyroXData, {x: new Date(), y: parseInt(dataPoint.gyroX)}])
        setGyroYData(gyroYData => [...gyroYData, {x: new Date(), y: parseInt(dataPoint.gyroY)}])
        setGyroZData(gyroZData => [...gyroZData, {x: new Date(), y: parseInt(dataPoint.gyroZ)}])
      }
    })
  }, []);

  return (
    <div className="App">
      <Chart gyroXData={gyroXData} gyroYData={gyroYData} gyroZData={gyroZData} />
    </div>
  );
}

export default App;
