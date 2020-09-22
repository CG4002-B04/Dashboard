const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/CG4002_Dashboard', {userMongoClient: true})
mongoose.Promise = global.Promise