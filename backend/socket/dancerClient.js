var net = require('net');
const readline = require('readline');
const fs = require('fs');

const filepath = '../db/csv/dancerInit.txt'


// creating a custom socket client and connecting it....
var client  = new net.Socket();
client.connect({
  port:2222
});

client.on('connect',function(){
  console.log('Client: connection established with server');

  console.log('---------client details -----------------');
  var address = client.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Client is listening at port ' + port);
  console.log('Client ip : ' + ipaddr);
  console.log('Client is IP4/IP6: ' + family);

  console.log('Client connected');
});

client.setEncoding('utf8');

async function processLineByLine() {
  const fileStream = fs.createReadStream(filepath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    client.write(line);
    await sleep(500);
  }
}

function sleep(ms) {
  return new Promise(resolve=>{
    setTimeout(resolve,ms)
  })
}
processLineByLine();

client.on('data',function(data){
  console.log('Data from server:' + data);
});