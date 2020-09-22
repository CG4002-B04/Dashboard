import React, {Component} from 'react';
import {Scatter} from 'react-chartjs-2'

const Chart = ({ data }) => {
  console.log(data);
  return (
    <div className="chart">
      <Scatter
        data={data}
        options={{
          title:{
            display:true,
            text:'Sensor data',
            fontSize:25
          },
          legend:{
            display:true,
            position:'right'
          }
        }}
      />
    </div>
  );
}

export default Chart;