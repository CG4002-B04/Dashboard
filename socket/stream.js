const csvParser = require('csv-parser');
const readline = require('readline');
const fs = require('fs');

const filepath = "./csv/hair.csv"

const readInterface = readline.createInterface({
  input: fs.createReadStream(filepath),
  output: process.stdout,
  console: false
});

/*
fs.createReadStream(filepath)
    .on('error', () => {
      // handle error
    })
    .pipe(csvParser())
    .on('data', (row) => {
      console.log(row); //there is some pretty printing for row by csv-parser
    })
    .on('end', () => {
      // handle end of CSV
    })
*/