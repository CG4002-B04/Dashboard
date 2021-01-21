const readline = require('readline');
const fs = require('fs');

const filePath = "./rocket.csv"

const readInterface = readline.createInterface({
  input: fs.createReadStream(filePath),
  output: process.stdout,
  console: false
});

let newLine;
let replacedLine;
readInterface.on('line', function(line) {
  replacedLine = line.replace(/,/g , '|');
  newLine = "!D|2|" + replacedLine + "|$\n";
  fs.appendFile('rocket.txt', newLine, function(err) {
    if (err) {
      console.log('append failed');
    } else {  
      console.log('done');
    }
  })
});
