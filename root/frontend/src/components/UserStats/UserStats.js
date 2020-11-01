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

import UserCard from "../UserCard/UserCard"
import UserDanceAccuracyBar from "../UserDanceAccuracyBar/UserDanceAccuracyBar"

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

const getDances = async (setBestMoves, setWorstMoves, dancerName) => {
  try {
    const url = new URL('http://localhost:4000/prediction/moveAccuracyDancer')
    const params = {dancerName : dancerName}
    url.search = new URLSearchParams(params).toString()
    const response = await fetch(url)
    const moveAccuraciesDancers = await response.json()
    const ascDances = moveAccuraciesDancers.ascDances
    setBestMoves([ascDances[7][0], ascDances[6][0], ascDances[5][0]])
    setWorstMoves([ascDances[0][0], ascDances[1][0], ascDances[2][0]])
  } catch (err) {
    console.error(err.message);
  }
}

function UserStats({name}) {
  const classes = useStyles();
  const [bestMoves, setBestMoves] = useState(['','',''])
  const [worstMoves, setWorstMoves] = useState(['','',''])
  const userStatsHeight = clsx(classes.paper, classes.fixedUserStatsHeight)

  useEffect(() => {
    getDances(setBestMoves, setWorstMoves, name)
    const interval = setInterval(() => {
      getDances(setBestMoves, setWorstMoves, name)
    }, 10000)

    return () => clearInterval(interval)
  })
  return(
    <Paper className={userStatsHeight}>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <UserCard dancerName={name} />
        </Grid>
        <Grid item xs={7}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.title} gutterBottom>
                Best Moves
              </Typography>
              <div className={classes.listPaper}>
                <List>
                    <ListItem>
                      <ListItemText
                        primary= "Zigzag" 
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText
                        primary="Hair"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText
                        primary="Rocket"
                      />
                    </ListItem>
                    <Divider />
                </List>
              </div>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.title} gutterBottom>
                Confusing Moves 
              </Typography>
              <div className={classes.listPaper}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary= "Elbow Lock" 
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Windows"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Pushback"
                    />
                  </ListItem>
                  <Divider />
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
                {name === "JingXuan" ? '63%' : '74%' }
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h5" className={classes.title} gutterBottom>
                Avg Sync Delay 
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h5" className={classes.title} gutterBottom>
                {name === "JingXuan" ? '2.73' : '3.26' }
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <UserDanceAccuracyBar dancerName={name}/>
        </Grid>
      </Grid>
    </Paper>
  );
}
export default UserStats;