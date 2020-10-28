import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Bar } from 'react-chartjs-2';

import UserCard from "../UserCard/UserCard"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedUserStatsHeight : {
    height: 500,
  },
}));

function UserStats({name}) {
  const classes = useStyles();
  const userStatsHeight = clsx(classes.paper, classes.fixedUserStatsHeight)
  return(
    <Paper className={userStatsHeight}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <UserCard dancerName={name} />
        </Grid>
      </Grid>
    </Paper>
  );
}
export default UserStats;