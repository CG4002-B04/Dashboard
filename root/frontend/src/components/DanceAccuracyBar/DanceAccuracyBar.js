import React, { useEffect, useState } from 'react'
import { Bar } from '@reactchartjs/react-chart.js'

const rand = () => Math.round(Math.random() * 20 - 10)

const genData = () => ({
  labels: ['Windows', 'Pushback', 'Elbow Lock', 'Rocket', 'Hair', 'ZigZag', 'Scarecrow', 'Shouldershrug'],
  datasets: [
    {
      label: 'Scale',
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()],
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
})

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const DanceAccuracyBar = () => {
  const [data, setData] = useState(genData())

  useEffect(() => {
    const interval = setInterval(() => setData(genData()), 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className='header'>
        <h1 className='title'>Dynamic Bar Chart</h1>
      </div>
      <Bar data={data} options={options} />
    </>
  )
}

export default DanceAccuracyBar 