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
  fixedSyncDelayHeight: {
    height: 500,
  },
}));

export default function SyncDelay() {
  const classes = useStyles();
  const [syncDelay, setSyncDelay] = useState('0.0');
  const syncDelayHeight = clsx(classes.paper, classes.fixedSyncDelayHeight);

  useEffect(() => {
    socket.on('evalData', dataPoint => {
      setSyncDelay(dataPoint.syncDelay);
    });
  }, [])
  return (
    <Paper className={syncDelayHeight}>
      <Typography component="h2" variant="h6" color="primary"  gutterBottom>
        <Box fontWeight="fontWeightBold">
          Sync Delay
        </Box>
      </Typography>
      <Box pt={10}>
      </Box>
      <Typography component="h1" variant="h1" color="primary"  gutterBottom>
        {syncDelay}
      </Typography>
      <Box pt={5}>
      </Box>
      <Typography component="h2" variant="h4">
        Keep It Up!
      </Typography>
    </Paper>
  );
}