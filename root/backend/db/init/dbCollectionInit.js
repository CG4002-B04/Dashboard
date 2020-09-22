const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("CG4002_Dashboard");
  dbo.createCollection("sensorData", function(err, res) {
    if (err) throw err;
    console.log(`Collection "sensorData" created!`);
  });

  dbo.createCollection("predictions", function(err, res) {
    if (err) throw err;
    console.log(`Collection "prediction" created!`)
  })

  dbo.createCollection("dancers", function(err, res) {
    if (err) throw err;
    console.log(`Collection "dancers" created!`)
  })
  db.close();
});