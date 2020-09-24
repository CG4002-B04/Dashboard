import React from 'react';
import {Scatter} from 'react-chartjs-2';
import "chartjs-plugin-streaming";

import io from "socket.io-client";

const ENDPOINT = 'http://localhost:5000';
let socket = io(ENDPOINT);

let gyroXData = 0;
let gyroYData = 0;
let gyroZData = 0;

socket.on('data', dataPoint => {
  console.log('incoming data');
  gyroXData = dataPoint.gyroX;
  gyroYData = dataPoint.gyroY;
  gyroZData = dataPoint.gyroZ;
})
const Chart = () => {
  return (
    <div className="chart">
      <Scatter
        data={{
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
              data: []
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
        }}
        options={{
          title:{
            display:true,
            text:'Sensor data',
            fontSize:25
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: false
          },
          legend:{
            display:true,
            position:'top'
          },
          scales: {
            xAxes: [{
              type: 'realtime',
              realtime: {
                duration: 20000,
                ttl: 60000,
                refresh: 300,
                delay: 1000,
                pause: false,
                onRefresh: function(chart) {
                  chart.data.datasets[0].data.push({
                    x: Date.now(),
                    y: parseInt(gyroXData)
                  });
                  chart.data.datasets[1].data.push({
                    x: Date.now(),
                    y: parseInt(gyroYData)
                  });
                  chart.data.datasets[2].data.push({
                    x: Date.now(),
                    y: parseInt(gyroZData)
                  });
                  
                },
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Time'
              }
            }],
            yAxes: [{
              display: true,
              ticks: {
                suggestedMin: -40000,
                suggestedMax:  40000
              },
              scaleLabel: {
                display: true,
                labelString: 'Coordinate'
              }
            }]
          },
          plugins: {
            streaming: {
              frameRate: 30
            }
          }
        }}
      />
    </div>
  );
}

export default Chart;