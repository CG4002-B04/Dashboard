const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

async function run(dancerName) {
  try {
    await client.connect();
    const database = client.db("CG4002_Dashboard");
    const predictions = database.collection("predictions");
    let total = await predictions.aggregate([ 
    { $match: {
        dancer: dancerName}}, 
    { $group: { 
      _id : null, sum : { 
                    $sum: {
                      "$toDouble": "syncdelay"  
                    }
                  }
              }
    }]
    )
    console.log(total);
  } finally {
    await client.close();
  }
}
run("Jiajian").catch(console.dir);
module.exports.run = run;