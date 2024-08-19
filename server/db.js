const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    mongoose.connect("mongodb://0.0.0.0:27017/gamerDB");
    const db = mongoose.connection;
    db.on("error", () => {
      console.log("not able to connect to database");
    });
    db.once("open", () => {
      console.log("connected to database");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDb;
