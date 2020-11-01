const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

async function accuracyDancer(dancerName) {
  try {
    await client.connect();
    const database = client.db("CG4002_Dashboard");
    const predictions = database.collection("predictions");
    const queryCorrect = {dancer : dancerName, isCorrect: true}
    const queryIncorrect = { dancer: dancerName, isCorrect: false}; 
    const countCorrect = await predictions.countDocuments(queryCorrect);
    const countIncorrect = await predictions.countDocuments(queryIncorrect);
    console.log(`Number of correct dance: ${countCorrect}`);
    console.log(`Number of incorrect dance: ${countIncorrect}`);
  } finally {
    await client.close();
  }
}
accuracyDancer("JiaJian").catch(console.dir);
module.exports.accuracyDancer = accuracyDancer;