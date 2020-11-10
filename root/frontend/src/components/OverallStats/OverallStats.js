import React, { useEffect , useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import OverallDanceAccuracyBar from '../OverallDanceAccuracyBar/OverallDanceAccuracyBar';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedUserStatsHeight : {
    height: 900,
  },
  listPaper: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const getDances = async (setBestMoves, setWorstMoves) => {
  try {
    const url = new URL('http://localhost:4000/prediction/moveAccuracyOverall')
    const response = await fetch(url)
    const moveAccuracies= await response.json()
    const ascDances = moveAccuracies.ascDances
    setBestMoves([ascDances[7][0], ascDances[6][0], ascDances[5][0]])
    setWorstMoves([ascDances[0][0], ascDances[1][0], ascDances[2][0]])
  } catch (err) {
    console.error(err.message);
  }
}

const getAccuracy = async (setAccuracy) => {
  try {
    const url = new URL('http://localhost:4000/prediction/accuracyOverall')
    const response = await fetch(url)
    const resAccuracy = await response.json()
    const accuracy = resAccuracy.accuracy;
    setAccuracy((accuracy * 100))
  } catch (err) {
    console.error(err.message);
  }
}

const getSyncDelay = async (setSyncDelay) => {
  try {
    const url = new URL('http://localhost:4000/prediction/syncDelayOverall')
    const response = await fetch(url)
    const resSyncDelay = await response.json()
    const syncDelay = resSyncDelay.syncDelay;
    console.log("sync delay", syncDelay)
    setSyncDelay(syncDelay);
  } catch (err) {
    console.error(err.message)
  }
}

function OverallStats() {
  const classes = useStyles();
  const [bestMoves, setBestMoves] = useState(['','',''])
  const [worstMoves, setWorstMoves] = useState(['','',''])
  const [accuracy, setAccuracy] = useState(0);
  const [syncDelay, setSyncDelay] = useState(0.0);
  const userStatsHeight = clsx(classes.paper, classes.fixedUserStatsHeight)
  //TODO: Make sure that it doesn't make too many requests (check double renders etc)
  useEffect(() => {
    getDances(setBestMoves, setWorstMoves)
    getSyncDelay(setSyncDelay)
    getAccuracy(setAccuracy)
    const interval = setInterval(() => {
      getDances(setBestMoves, setWorstMoves)
    }, 10000)

    return () => clearInterval(interval)
  }, [])
  return(
    <Paper className={userStatsHeight}>
      <Grid container spacing={4}>

        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.title} gutterBottom>
                Best Moves
              </Typography>
              <div className={classes.listPaper}>
                <List>
                    {bestMoves.map(move => (
                      <div>
                        <ListItem>
                        <ListItemText
                          primary={move}
                          />
                        </ListItem>
                        <Divider />
                      </div>
                      
                    ))}
                </List>
              </div>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.title} gutterBottom>
                Confusing Moves 
              </Typography>
              <div className={classes.listPaper}>
                <List>
                    {worstMoves.map(move => (
                      <div>
                        <ListItem>
                        <ListItemText
                          primary={move}
                          />
                        </ListItem>
                        <Divider />
                      </div>
                    ))}
                </List>
              </div> 
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h5" className={classes.title} gutterBottom>
                Accuracy
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h5" className={classes.title} gutterBottom>
                {accuracy.toFixed(0)}%
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h5" className={classes.title} gutterBottom>
                Avg Sync Delay 
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h5" className={classes.title} gutterBottom>
                {syncDelay.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <OverallDanceAccuracyBar />
        </Grid>
      </Grid>
    </Paper>
  );
}
export default OverallStats;