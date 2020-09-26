const io = require('socket.io-client')
var net = require('net');

const ENDPOINT = 'http://localhost:5000';
let socketClient = io(ENDPOINT);
  
// creates the server
var server = net.createServer();


// emitted when server closes
server.on('close', function(){
  console.log('Server closed !');
});

// emitted when new client connects
server.on('connection',function(socket){

  //this property shows the number of characters currently buffered to be written. (Number of characters is approximately equal to the number of bytes to be written, but the buffer may contain strings, and the strings are lazily encoded, so the exact number of bytes is not known.)
  //Users who experience large or growing bufferSize should attempt to "throttle" the data flows in their program with pause() and resume().
  
    console.log('Buffer size : ' + socket.bufferSize);
  
    var lport = socket.localPort;
    var laddr = socket.localAddress;
    console.log('Server is listening at LOCAL port ' + lport);
    console.log('Server LOCAL ip : ' + laddr);
  
    console.log('------------remote client info --------------');
  
    var rport = socket.remotePort;
    var raddr = socket.remoteAddress;
    var rfamily = socket.remoteFamily;
  
    console.log('REMOTE Socket is listening at port' + rport);
    console.log('REMOTE Socket ip :' + raddr);
    console.log('REMOTE Socket is IP4/IP6 : ' + rfamily);
  
    console.log('--------------------------------------------')
  server.getConnections(function(error,count){
    console.log('Number of concurrent connections to the server : ' + count);
  });
    
  socket.setEncoding('utf8');

  socket.setTimeout(800000,function(){
    // called after timeout -> same as socket.on('timeout')
    // it just tells that soket timed out => its ur job to end or destroy the socket.
    // socket.end() vs socket.destroy() => end allows us to send final data and allows some i/o activity to finish before destroying the socket
    // whereas destroy kills the socket immediately irrespective of whether any i/o operation is goin on or not...force destry takes place
    console.log('Socket timed out');
  });
    
    
  socket.on('data',function(data){
    var bread = socket.bytesRead;
    var bwrite = socket.bytesWritten;
    
    console.log('Bytes read : ' + bread);
    console.log('Bytes written : ' + bwrite);
    console.log('Data sent to server : ' + data);

    socketClient.emit('endpointData', data, (error) => {
      if (error) {
        console.log(error);
      }
    });

    // if (data[0] == '#') {
    //   socketClient.emit('endpointEvalData', data, (error) => {
    //     if (error)
    //       console.log(error);
    //   });
    // } else if (data[3] == '0') {
    //   socketClient.emit('endpointData', data, (error) => {
    //     if (error) {
    //       console.log(error);
    //     }
    //   });
    // } else if (data[3] == '1') {

    // } else if (data[3] == '2') {

    // }
    
    //echo data
    var is_kernel_buffer_full = socket.write(data);
    if(is_kernel_buffer_full){
      console.log('Data was flushed successfully from kernel buffer i.e written successfully!');
    }else{
      socket.pause();
    }

  });

  socket.on('drain',function(){
    console.log('write buffer is empty now .. u can resume the writable stream');
    socket.resume();
  });

  socket.on('error',function(error){
    console.log('Error : ' + error);
  });

  socket.on('timeout',function(){
    console.log('Socket timed out !');
    socket.end('Timed out!');
    // can call socket.destroy() here too.
  });

  socket.on('end',function(data){
    console.log('Socket ended from other end!');
    console.log('End data : ' + data);
  });

  socket.on('close',function(error){
    var bread = socket.bytesRead;
    var bwrite = socket.bytesWritten;
    console.log('Bytes read : ' + bread);
    console.log('Bytes written : ' + bwrite);
    console.log('Socket closed!');
    if(error){
      console.log('Socket was closed because of transmission error');
    }
  }); 

  setTimeout(function(){
    var isdestroyed = socket.destroyed;
    console.log('Socket destroyed:' + isdestroyed);
    socket.destroy();
  },1200000);

});

// emits when any error occurs -> calls closed event immediately after this.
server.on('error',function(error){
  console.log('Error: ' + error);
});

//emits when server is bound with server.listen
server.on('listening',function(){
  console.log('Server is listening!');
});

server.maxConnections = 10;

//static port allocation
server.listen(2222);