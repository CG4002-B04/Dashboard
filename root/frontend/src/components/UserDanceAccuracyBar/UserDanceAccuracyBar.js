import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedDanceAccuracyBarHeight: {
    height: 400,
  },
}));

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          max: 100,
          min: 0,
          beginAtZero: true,
        },
      },
    ],
  },
}

const UserDanceAccuracyBar = () => {
  const classes = useStyles();
  const danceAccuracyBarHeight = clsx(classes.paper, classes.fixedDanceAccuracyBarHeight);

  return (
    <Paper className={danceAccuracyBarHeight}>
      <div className='header'>
        <h1 className='title'>Dance Moves Accuracy</h1>
      </div>
      <Bar data={
        {
          labels: ['Windows', 'Pushback', 'Elbow Lock', 'Rocket', 'Hair', 'ZigZag', 'Scarecrow', 'Shouldershrug'],
          datasets: [
            {
              label: '% Accuracy',
              data: [10, 20, 30, 
                     40, 50, 60, 
                     70, 80],
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
        }
      } 
      options={options} height={80}/>
    </Paper>
  )
}

export default UserDanceAccuracyBar 