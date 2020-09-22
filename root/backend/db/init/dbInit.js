const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/CG4002_Dashboard"

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});