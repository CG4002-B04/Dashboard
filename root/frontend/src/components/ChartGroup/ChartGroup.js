import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
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
    flexDirection: 'column'
  },
  sensor: {
    display: 'flex',
    overflow: 'auto',
    flexDirection:'row'
  },
  fixedHeight: {
    height: 750,
  },
}));

function ChartGroup({dancer}) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return(
    <Grid item xs={12}>
        
      <Paper className={fixedHeightPaper}>
        <div className={classes.layout}>
        </div>
        <div className={classes.accelGyro}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            <Box fontWeight="fontWeightBold">
              Dancer {dancer}
            </Box>
          </Typography>
        </div>
        <div className={classes.sensor}>
          <div className={classes.accelGyro}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              <Box fontWeight="fontWeightMedium">
                Left Hand Sensor
              </Box>
              
            </Typography>
            <Chart metric="Accelerometer" dancer={dancer} hand='Left'/>
            <Chart metric="Gyrometer" dancer={dancer} hand='Left'/>
          </div>
          <div className={classes.accelGyro}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              <Box fontWeight="fontWeightMedium">
                Right Hand Sensor
              </Box>
            </Typography>
            <Chart metric="Accelerometer" dancer={dancer} hand='Right'/>
            <Chart metric="Gyrometer" dancer={dancer} hand='Right'/>
          </div>
        </div>
      </Paper>
    </Grid>
  );
}

export default ChartGroup;