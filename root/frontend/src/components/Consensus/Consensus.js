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
  let numOfSamples = 0;
  let succSamples = 0;
  const [consensus, setConsensus] = useState(0.0);
  const consensusHeight = clsx(classes.paper, classes.fixedConsensusHeight);
  
  useEffect(() => {
    socket.on('evalData', dataPoint => {
      numOfSamples++;
      let danceMoves = dataPoint.danceMoves.split(" ");
      if (danceMoves[0] === danceMoves[1] && danceMoves[0] === danceMoves[2]) {
        succSamples++;
      }
      // must have prev so that you don't always refer to initial value always due to closure
      setConsensus(prev => succSamples / numOfSamples);
      //console.log('Succ: ' + succSamples);
      //console.log('Samples: ' + numOfSamples);
      //console.log('Consensus: ' + consensus);
    });
  }, []);

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
        {(consensus * 100).toFixed(0)}%
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