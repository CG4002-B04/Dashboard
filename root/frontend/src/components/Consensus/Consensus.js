import React, {useState, useEffect} from 'react';
import io from "socket.io-client";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const ENDPOINT = 'http://localhost:5000';
let socket = io(ENDPOINT);

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedConsensusHeight: {
    height: 500,
  },
}));

export default function Consensus() {
  const classes = useStyles();
  const [consensus, setConsensus] = useState(0.0);
  const [numOfSamples, setNumOfSamples] = useState(0);
  const [succSamples, setSuccSamples] = useState(0);
  const consensusHeight = clsx(classes.paper, classes.fixedConsensusHeight);
  
  useEffect(() => {
   socket.on('evalData', dataPoint => {
    setNumOfSamples(numOfSamples => numOfSamples + 1);
    /*
    let danceMoves = dataPoint.danceMoves.split(" ");
    if (danceMoves[0] === danceMoves[1] && danceMoves[0] === danceMoves[2]) {
      setSuccSamples(succSamples + 1);
      console.log('success');
    }
    setConsensus(numOfSamples === 0 ? (0.0).toFixed(2) : (succSamples / numOfSamples).toFixed(2));
    */
    console.log('Succ: ' + succSamples);
    console.log('Samples: ' + numOfSamples);
    console.log('Consensus: ' + consensus);
    }); 
  }, [])
  return (
    <Paper className={consensusHeight}>
      <Typography component="h2" variant="h6" color="primary"  gutterBottom>
        <Box fontWeight="fontWeightBold">
          Consensus Accuracy
        </Box>
      </Typography>
      <Box pt={10}>
      </Box>
      <Typography component="h1" variant="h1" color="primary"  gutterBottom>
        {consensus * 100}%
      </Typography>
      <Box pt={5}>
      </Box>
      {consensus >= 0.5 ? 
        <Typography component="h2" variant="h4" color="green">
          Keep It Up!
        </Typography> 
        :
        <Typography component="h2" variant="h4" color="red">
          Try harder
        </Typography>      
      }
    </Paper>
  );
}