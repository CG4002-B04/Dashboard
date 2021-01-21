const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("CG4002_Dashboard");
    dbo.createCollection("evaluationgroups", function (err, res) {
      if (err) throw err;
      console.log(`Collection "evaluationgroups" created!`);
    });

    dbo.createCollection("sensorreadings", function(err, res) {
      if (err) throw err;
      console.log(`Collection "sensorreadings" created!`);
    });

    dbo.createCollection("predictions", function(err, res) {
      if (err) throw err;
      console.log(`Collection "prediction" created!`)
    });

    dbo.createCollection("dancers", function(err, res) {
      if (err) throw err;
      console.log(`Collection "dancers" created!`)
    });
    
    // Ensure that db.close is at the end
    db.close();
});