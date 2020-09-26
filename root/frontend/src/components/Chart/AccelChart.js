import React from 'react';
import {Scatter} from 'react-chartjs-2';
import "./Chart.css"
import "chartjs-plugin-streaming";

import io from "socket.io-client";
const ENDPOINT = 'http://localhost:5000';
let socket = io(ENDPOINT);

const chartColors = {
  red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

let gyroXData = 0;
let gyroYData = 0;
let gyroZData = 0;

socket.on('data', dataPoint => {
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
              backgroundColor: chartColors.red,
              borderColor: chartColors.red,
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
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
              backgroundColor: chartColors.orange,
              borderColor: chartColors.orange,
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
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
              backgroundColor: chartColors.blue,
              borderColor: chartColors.blue,
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
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
          responsive: true,
          title:{
            display:true,
            text: 'Gyrometer Data',
            fontSize:20
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