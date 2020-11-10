const MongoClient  = require("mongodb").MongoClient;
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, {poolSize: 10, bufferMaxEntries: 0, useNewUrlParser: true,useUnifiedTopology: true});

async function divide() {
  try {
    await client.connect();
    const database = client.db("CG4002_Dashboard");
    const predictions = database.collection("predictions");
    await predictions.find({syncdelay: { $gt: 100} }).forEach(function(data) {
      predictions.updateMany({}, {
        "$set": {
          "syncdelay": (data.syncdelay/1000)
        }
      })
    })
    console.log('done dividing')
  } finally {
    await client.close();
  }
}
divide().catch(console.dir);