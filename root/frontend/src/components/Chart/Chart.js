import React from 'react';
import {Scatter} from 'react-chartjs-2';
import "./Chart.css"
import "chartjs-plugin-streaming";
import 'fontsource-roboto';
import SensorData from "../SensorData/SensorData"
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


const Chart = ({metric, dancer, hand}) => {
  let sensorXData = 0;
  let sensorYData = 0;
  let sensorZData = 0;
  socket.on(metric + "Data" + dancer + hand, dataPoint => {
    // console.log("received " + metric + "Data" + dancer + hand);
    // console.log(dataPoint);
    sensorXData = parseInt(dataPoint.x);
    sensorYData = parseInt(dataPoint.y);
    sensorZData = parseInt(dataPoint.z);
  });

  return (
    <div className="chart">
      <Scatter
        data={{
          type: ['Scatter'],
          datasets: [
            {
              label: metric === 'Gyrometer' ? 'GyroX' : 'AccelX',
              fill: false,
              lineTension: 0.1,
              backgroundColor: metric === 'Gyrometer' ? chartColors.red : chartColors.green,
              borderColor: metric === 'Gyrometer' ? chartColors.red : chartColors.green,
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
              label: metric === 'Gyrometer' ? 'GyroY' : 'AccelY',
              fill: false,
              lineTension: 0.1,
              backgroundColor: metric === 'Gyrometer' ? chartColors.orange : chartColors.purple,
              borderColor: metric === 'Gyrometer' ? chartColors.orange : chartColors.purple,
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
              label: metric === 'Gyrometer' ? 'GyroZ' : 'AccelZ',
              fill: false,
              lineTension: 0.1,
              backgroundColor: metric === 'Gyrometer' ? chartColors.blue : chartColors.yellow,
              borderColor: metric === 'Gyrometer' ? chartColors.blue : chartColors.yellow,
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
            text: metric + " Data",
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
                duration: 10000,
                ttl: 30000,
                refresh: 400,
                delay: 1000,
                pause: false,
                onRefresh: function(chart) {
                  chart.data.datasets[0].data.push({
                    x: Date.now(),
                    y: sensorXData
                  });
                  chart.data.datasets[1].data.push({
                    x: Date.now(),
                    y: sensorYData
                  });
                  chart.data.datasets[2].data.push({
                    x: Date.now(),
                    y: sensorZData
                  });
                },
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
                suggestedMin: -20000,
                suggestedMax:  20000
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