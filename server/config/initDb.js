const mongoose = require("mongoose");
require("dotenv").config();

const initDB = () => {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  
    // connection to db
    mongoose.connect(process.env.MONGO_URL, {
    }).then(() => console.log("MONGODB connected"))
      .catch(error => console.log(error))
  
    //access connection object
    const connection = mongoose.connection;
   
    // Event listeners for connection objects
    connection.on("connected", () => {
      console.log("Connected to the database successfully");
    });
  
    connection.on("error", (err) => {
      console.log(err);
    });
  
    connection.on("disconnected", () => {
      console.log("Disconnected");
    });
};
  
// initDatabase();
  
module.exports = initDB;