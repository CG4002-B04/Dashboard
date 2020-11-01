const MongoClient  = require("mongodb").MongoClient;
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, {poolSize: 10, bufferMaxEntries: 0, useNewUrlParser: true,useUnifiedTopology: true});

async function fromStringToFloat() {
  try {
    await client.connect();
    const database = client.db("CG4002_Dashboard");
    const predictions = database.collection("predictions");
    await predictions.find({}).forEach(function(data) {
      predictions.updateMany({}, {
        "$set": {
          "syncdelay": parseFloat(data.syncdelay)
        }
      })
    })
    console.log('done converting')
  } finally {
    await client.close();
  }
}
fromStringToFloat().catch(console.dir);