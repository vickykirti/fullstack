const mongoose = require("mongoose");

//mongoose.connect("");

const mongoDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
    console.log("Database Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

mongoDB();
