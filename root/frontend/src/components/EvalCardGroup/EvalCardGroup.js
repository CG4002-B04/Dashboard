import React, {useState, useEffect} from 'react';
import io from "socket.io-client";
import EvalCard from '../EvalCard/EvalCard' 
import './EvalCardGroup.css'
const ENDPOINT = 'http://localhost:5000';
let socket = io(ENDPOINT);

function EvalCardGroup() {
  const [positionsToDancers, setPositiontoDancers] = useState({
                                                      '1' : 'undefined',
                                                      '2' : 'undefined',
                                                      '3' : 'undefined'
                                                    });
  const [positions, setPositions] = useState(['1', '2', '3']);
  const [danceMoves, setDanceMoves] = useState(["Neutral", "Neutral", "Neutral"]);
  useEffect(() => {
    socket.on('evalData', dataPoint => {
      // console.log(dataPoint.danceMoves.split(" "));
      // console.log(dataPoint.positions.split(" "));
      setPositions(dataPoint.positions.split(" "));
      setDanceMoves(dataPoint.danceMoves.split(" "));
    })
  }, [])
  
  return (
    <div className="EvalCardGroup">
      <EvalCard dancerName={positionsToDancers[positions[0]]} position={positions[0]} danceMove={danceMoves[0]}/>
      <EvalCard dancerName={positionsToDancers[positions[1]]} position={positions[1]} danceMove={danceMoves[1]}/>
      <EvalCard dancerName={positionsToDancers[positions[2]]} position={positions[2]} danceMove={danceMoves[2]}/>
    </div>
  )
}

export default EvalCardGroup;