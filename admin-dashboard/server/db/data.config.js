const mongoose = require("mongoose");
const DATABASE_URI = process.env.DATABASE_URI;

mongoose.connect(DATABASE_URI).then((res) => {
  console.log("Database Connected");
});
