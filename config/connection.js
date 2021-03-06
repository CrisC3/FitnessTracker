//dotenv required for .env file
require("dotenv").config();

const mongoose = require("mongoose");
const databaseUrl = "workout";
const dbConnect = process.env.MONGODB_URI || "mongodb://localhost:27017/" + databaseUrl;

mongoose.connect(dbConnect, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Successfully connected to MongoDb to = '" + db._connectionString + "'");
});
  
module.exports = mongoose;