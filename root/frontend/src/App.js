import React, { useState, useEffect } from 'react';
import './App.css';
import io from "socket.io-client";
import Chart from './components/Chart/Chart'; 

let socket;

const sensorData = {
  //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  type: ['Scatter'],
  datasets: [
    {
      label: 'Gyro',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
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
      data: [
        { x: 1, y: 2 },
        { x: 59, y: 49 },
        { x: 80, y: 90 },
        { x: 81, y: 29 },
        { x: 90, y: 36 },
        { x: 150, y: 25 },
        { x: 152, y: 18 },
      ]
    }
  ]
}

function App() {
  const [data, setData] = useState(sensorData);

  useEffect
  return (
    <div className="App">
      <Chart data={data}/>
    </div>
  );
}

export default App;
