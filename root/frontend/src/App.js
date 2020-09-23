import React, { useState, useEffect } from 'react';
import './App.css';
import Chart from './components/Chart/Chart'; 
import io from "socket.io-client";

const ENDPOINT = 'http://localhost:5000';
let socket = io(ENDPOINT);


const initialData = {
  type: ['Scatter'],
  datasets: [
    {
      label: 'GyroX',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(255,51,51,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      showLine: true,
      data: [{x : 0, y : 0}, {x : 1, y : 1}]
    },
    {
      label: 'GyroY',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(0,204,102,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      showLine: true,
      data: []
    },
    {
      label: 'GyroZ',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(0,102,204,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      showLine: true,
      data: []
    }
  ]
}

function App() {
  const [data, setData] = useState(initialData);
  const [gyroXData, setGyroXData] = useState([]);
  const [gyroYData, setGyroYData] = useState([]);
  const [gyroZData, setGyroZData] = useState([]);
  let counter = 0;
  useEffect(() => {
    socket.on('data', dataPoint => {
      console.log(dataPoint.gyroX);
      console.log(dataPoint.gyroY);
      setGyroXData(gyroXData => [...gyroXData, {x: counter, y: parseInt(dataPoint.gyroX)}])
      setGyroYData(gyroYData => [...gyroYData, {x: counter, y: parseInt(dataPoint.gyroY)}])
      console.log(gyroXData);
      console.log(gyroYData);
      counter++;
    })
  }, []);

  return (
    <div className="App">
      <Chart data={data} gyroXData={gyroXData} gyroYData={gyroYData} gyroZData={gyroZData} />
    </div>
  );
}
//<Chart data={data} gyroXData={gyroXData} gyroYData={gyroYData} gyroZData={gyroZData} />
export default App;
