import React, {useState, useEffect} from 'react';
import io from "socket.io-client";
import EvalCard from '../EvalCard/EvalCard' 
import './EvalCardGroup.css'
const ENDPOINT = 'http://localhost:5000';
let socket = io(ENDPOINT);

function EvalCardGroup() {
  const [positionsToDancers, setPositiontoDancers] = useState(['unknown', 'unknown', 'unknown']);
  const [positions, setPositions] = useState(['1', '2', '3']);
  const [danceMoves, setDanceMoves] = useState(["Neutral", "Neutral", "Neutral"]);
  const [confidenceScores, setConfidenceScores] = useState(["0", "0", "0"]);

  useEffect(() => {
    socket.on('DancerData', dancerData => {
      //TODO: figure out why it only renders after the next setState
      setPositiontoDancers([...positionsToDancers, positionsToDancers[dancerData.id] = dancerData.name]);
    });
    socket.on('evalData', dataPoint => {
      // console.log(dataPoint.danceMoves.split(" "));
      // console.log(dataPoint.positions.split(" "));
      // console.log(dataPoint.confidence.split(" "));
      console.log('evalData')
      setPositions(dataPoint.positions.split(" "));
      setDanceMoves(dataPoint.danceMoves.split(" "));
      setConfidenceScores(dataPoint.confidence.split(" "));
    });
    
  }, [])
  
  return (
    <div className="EvalCardGroup">
      <EvalCard dancerName={positionsToDancers[positions[0] - 1]} position={positions[0]} danceMove={danceMoves[0]} confidenceScore={confidenceScores[0]}/>
      <EvalCard dancerName={positionsToDancers[positions[1] - 1]} position={positions[1]} danceMove={danceMoves[1]} confidenceScore={confidenceScores[1]}/>
      <EvalCard dancerName={positionsToDancers[positions[2] - 1]} position={positions[2]} danceMove={danceMoves[2]} confidenceScore={confidenceScores[2]}/>
    </div>
  )
}

export default EvalCardGroup;