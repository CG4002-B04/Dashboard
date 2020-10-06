import React, {useState} from 'react';
import io from "socket.io-client";
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
const ENDPOINT = 'http://localhost:5000';
let socket = io(ENDPOINT);

function SensorData({metric, dancer}) {
  const [XData, setXData] = useState(0);
  const [YData, setYData] = useState(0);
  const [ZData, setZData] = useState(0);

  socket.on(metric + "Data" + dancer, dataPoint => {
    setXData(parseInt(dataPoint.x));
    setYData(parseInt(dataPoint.y));
    setZData(parseInt(dataPoint.z));
  });
  return (
    <div className="SensorData">
      <Typography variant="subtitle1" gutterBottom>
         {metric} X = {XData}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
          {metric} Y = {YData}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
          {metric} Z = {ZData}
      </Typography>
    </div>
    
  )
}

export default SensorData;