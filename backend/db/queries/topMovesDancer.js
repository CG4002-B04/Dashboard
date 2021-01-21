/*
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  const dbo = db.db("CG4002_Dashboard");
  let queryCorrect = {dancer : "JingXuan", isCorrect: true}
  dbo.collection("predictions").find(queryCorrect).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });
  let queryIncorrect = {dancer : "JingXuan", isCorrect: false}
  dbo.collection("predictions").find(queryIncorrect).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  })
  db.close();
});
*/