import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from '../Chart/Chart';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  accelGyro: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'row'
  },
  fixedHeight: {
    height: 650,
  },
}));

function ChartGroup({dancer}) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return(
    <Grid item xs={12}>
      <Paper className={fixedHeightPaper}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Dancer {dancer}
        </Typography>
        <div className={classes.accelGyro}>
          <Chart metric="Gyrometer" dancer={dancer} hand='Left'/>
          <Chart metric="Gyrometer" dancer={dancer} hand='Right'/>
        </div>
        <div className={classes.accelGyro}>
          <Chart metric="Accelerometer" dancer={dancer} hand='Left'/>
          <Chart metric="Accelerometer" dancer={dancer} hand='Right'/>
        </div>
      </Paper>
    </Grid>
  );
}

export default ChartGroup;