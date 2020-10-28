import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Bar } from 'react-chartjs-2';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
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

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

function UserStats({name}) {
  const classes = useStyles();
  const userStatsHeight = clsx(classes.paper, classes.fixedUserStatsHeight)
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
                      primary="Zigzag"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Rocket"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Scarecrow"
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
                  <ListItem>
                    <ListItemText
                      primary="ShoulderShrug"
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
                20%
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h5" className={classes.title} gutterBottom>
                Avg Sync Delay 
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h5" className={classes.title} gutterBottom>
                0.23 
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <UserDanceAccuracyBar />
        </Grid>
      </Grid>
    </Paper>
  );
}
export default UserStats;