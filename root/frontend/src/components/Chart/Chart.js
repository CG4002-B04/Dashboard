import React from 'react';
import {Scatter} from 'react-chartjs-2';

const Chart = ({gyroXData, gyroYData, gyroZData }) => {
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
              data: gyroXData
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
              data: gyroYData
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
              data: gyroZData
            }
          ]
        }}
        options={{
          responsive: true,
          animation: {
            duration: 0
          },
          responsiveAnimationDuration: 0, // animation duration after a resize
          elements: {
            line: {
              tension: 0
            }
          },
          title:{
            display:true,
            text:'Sensor data',
            fontSize:25
          },
          tooltips: {
            mode: 'index',
            intersect: true
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          legend:{
            display:true,
            position:'top'
          },
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                displayFormats: {
                  millisecond: 'mm:ss:SSS'
                }
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
          }
        }}
      />
    </div>
  );
}

export default Chart;