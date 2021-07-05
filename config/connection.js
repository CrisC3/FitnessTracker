
const mongoose = require("mongoose");
const databaseUrl = "fitnessTracker";
const dbConnect = process.env.MONGODB_URI || "mongodb://localhost:27017/" + databaseUrl;

mongoose.connect(dbConnect, {
    useNewUrlParser: true,
    useFindAndModify: false
});
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Successfully connected to MongoDb");
});
  
module.exports = mongoose;