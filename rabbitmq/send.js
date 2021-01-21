#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

// connect to the rabbitMQ server
amqp.connect('amqp://localhost', function(error0, connection) {});

// create a channel for the APIs
amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    //declare a queue
    var queue = 'hello';
    var msg = 'Hello world';

    channel.assertQueue(queue, {
      durable: false
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() {
    connection.close();
    process.exit(0);
  }, 500);
});