const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const dances = ["windows", "pushback", "elbowlock", "rocket", "hair", "zigzag", "scarecrow", "shouldershrug"];
async function moveAccuracyDancer(dancerName) {
  try {
    await client.connect();
    const database = client.db("CG4002_Dashboard");
    const predictions = database.collection("predictions");

    let accuracies = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
    let countsCorrect = [0,0,0,0,0,0,0,0];
    let countsIncorrect = [0,0,0,0,0,0,0,0];
    for (let i = 0; i < 8; i++) {
      let queryCorrect = {dancer : dancerName, isCorrect: true, action: dances[i]}
      let queryIncorrect = { dancer: dancerName, isCorrect: false, action: dances[i]}; 
      countsCorrect[i] = await predictions.countDocuments(queryCorrect);
      countsIncorrect[i] = await predictions.countDocuments(queryIncorrect);
      if (countsCorrect[i] + countsIncorrect[i] !== 0) {
        accuracies[i] = countsCorrect[i] / (countsCorrect[i] + countsIncorrect[i])
      }
    }
    console.log(countsCorrect);
    console.log(countsIncorrect);
    console.log(accuracies);
  } finally {
    await client.close();
  }
}
moveAccuracyDancer("Jiajian").catch(console.dir);

module.exports.moveAccuracyDancer= moveAccuracyDancer;