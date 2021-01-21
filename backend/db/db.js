// Create a callback to access the database
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
let callback, db;
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'CG4002_Dashboard';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");

  db = client.db(dbName);
  callback(db)

  client.close();
});

module.exports = function(cb){
  if(typeof db != 'undefined' ){
    cb(db)
  }else{
    callback = cb
  }
}