import React, { useEffect, useState } from 'react'
import io from "socket.io-client";
import { Bar } from 'react-chartjs-2';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'


const ENDPOINT = 'http://localhost:5000'
let socket = io(ENDPOINT);

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedDanceAccuracyBarHeight: {
    height: 500,
  },
}));
const genData = (windows, pushback, elbowlock, rocket, hair, zigzag, scarecrow, shouldershrug) => ({
  labels: ['Windows', 'Pushback', 'Elbow Lock', 'Rocket', 'Hair', 'ZigZag', 'Scarecrow', 'Shouldershrug'],
  datasets: [
    {
      label: '% Accuracy',
      data: [windows, pushback, elbowlock, rocket, hair , zigzag, scarecrow, shouldershrug],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(204, 0, 102, 0.2)',
        'rgba(96, 96, 96, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(204, 0, 102, 1)',
        'rgba(96, 96, 96, 1)'
      ],
      borderWidth: 1,
    },
  ],
})

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const DanceAccuracyBar = () => {
  const classes = useStyles();
  const danceAccuracyBarHeight = clsx(classes.paper, classes.fixedDanceAccuracyBarHeight);
  
  let numOfSamples = [0,0,0,0,0,0,0,0];
  let succSamples = [0,0,0,0,0,0,0,0];
  let dances = ["windows", "pushback", "elbowlock", "rocket", "hair", "zigzag", "scarecrow", "shouldershrug"];
  // let windowsSamples = 0;
  // let windowsSuccess = 0;
  const [windowsConsensus, setWindowsConsensus] = useState(0.0);

  
  // let pushbackSamples = 0;
  // let pushbackSuccess = 0;
  const [pushbackConsensus, setPushbackConsensus] = useState(0.0);

  // let elbowlockSamples = 0;
  // let elbowlockSuccess = 0;
  const [elbowlockConsensus, setElbowllockConsensus] = useState(0.0);

  // let rocketSamples = 0;
  // let rocketSuccess = 0;
  const [rocketConsensus, setRocketConsensus] = useState(0.0);

  // let hairSamples = 0;
  // let hairSuccess = 0;
  const [hairConsensus, setHairConsensus] = useState(0.0);

  // let zigzagSamples = 0;
  // let zigzagSuccess = 0;
  const [zigzagConsensus, setZigzagConsensus] = useState(0.0);

  // let scarecrowSamples = 0;
  // let scarecrowSuccess = 0;
  const [scarecrowConsensus, setScarecrowConsensus] = useState(0.0);

  // let shouldershrugSamples = 0;
  // let shouldershrugSuccess = 0;
  const [shoulderShrugConsensus, setShoulderShrugConsensus] = useState(0.0);

  let danceMove;
  //TODO: Take into account NoMatch
  const [data, setData] = useState(genData(windowsConsensus,
                                          pushbackConsensus,
                                          elbowlockConsensus,
                                          rocketConsensus,
                                          hairConsensus,
                                          zigzagConsensus,
                                          scarecrowConsensus,
                                          shoulderShrugConsensus))
  useEffect(() => {
    socket.on('evalData', dataPoint => {
      let danceMoves = dataPoint.danceMoves.split(" ");
      // onlyu infer correct dance move if two people are dancing for the same thing
      if (danceMoves[0] === danceMoves[1] && danceMoves[1] === danceMoves[2]) {
        danceMove = danceMoves[0];
      } else if (danceMoves[0] === danceMoves[1] && danceMoves[1] !== danceMoves[2]) {
        danceMove = danceMoves[0]
      } else if (danceMoves[0] === danceMoves[2] && danceMoves[2] !== danceMoves[1]) {
        danceMove = danceMoves[0]
      } else if (danceMoves[1] === danceMoves[2] && danceMoves[2] !== danceMoves[0]) {
        danceMove = danceMoves[1];
      } else {
        //all dance moves are different
        danceMove = "NoMatch";
      }
      for (let i = 0; i < 8; i++) {
        if (danceMove === dances[i]) {
          numOfSamples[i]++;
          succSamples[i]++;
        } else if (danceMoves[0] === dances[i] || 
                   danceMoves[1] === dances[i] || 
                   danceMoves[2] === dances[i]) {
          numOfSamples[i]++;
        }
        if (numOfSamples[i] !== 0) {
            switch (dances[i]) {
            case "windows":
              setWindowsConsensus(prev => succSamples[i] / numOfSamples[i])
            break;
            case "pushback":
              setPushbackConsensus(prev => succSamples[i] / numOfSamples[i])
            break;
            case "elbowlock":
              setElbowllockConsensus(prev => succSamples[i] / numOfSamples[i])
            break;
            case "rocket":
              setRocketConsensus(prev => succSamples[i] / numOfSamples[i])
            break;
            case "hair":
              setHairConsensus(prev => succSamples[i] / numOfSamples[i])
            break;
            case "zigzag":
              setZigzagConsensus(prev => succSamples[i] / numOfSamples[i])
            break;
            case "scarecrow":
              setScarecrowConsensus(prev => succSamples[i] / numOfSamples[i])
            break;
            case "shouldershrug":
              setShoulderShrugConsensus(prev => succSamples[i] / numOfSamples[i])
            break;
            default:
          }
        }
      } 
      setData(genData(windowsConsensus,
                      pushbackConsensus,
                      elbowlockConsensus,
                      rocketConsensus,
                      hairConsensus,
                      zigzagConsensus,
                      scarecrowConsensus,
                      shoulderShrugConsensus))
      // for each dance, check whether the dance is in one of the 3 dance moves
      // if the dance in the minority, we consider it as a miss
      // else consider it as correct
      /*
      if (danceMove === "windows") {
        windowsSamples++;
        windowsSuccess++;
        setWindowsConsensus(prev => windowsSuccess / windowsSamples);
      } else if (danceMoves[0] === "windows" || danceMoves[1] === "windows" || danceMoves[2] === "windows") {
        windowsSamples++;
        setWindowsConsensus(prev => windowsSuccess / windowsSamples);
      }
      */
      /*
      
      */
    });
  }, [])

  return (
    <Paper className={danceAccuracyBarHeight}>
      <div className='header'>
        <h1 className='title'>Dance Moves Accuracy</h1>
      </div>
      <Bar data={data} options={options} />
    </Paper>
  )
}

export default DanceAccuracyBar 