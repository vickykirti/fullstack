const mongoose = require("mongoose");

//mongoose.connect("");

const mongoDB = async () => {
  try {
    await mongoose.connect("");
    console.log("Database Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

mongoDB();
