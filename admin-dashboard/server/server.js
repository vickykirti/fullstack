require("dotenv").config();
require("./db/data.config.js");
const express = require("express");
const app = express();
const router = require("./router/route.js");
const errorMiddleware = require("./middleware/error.middleware.js");
const cors = require("cors");

// const corsOptions = {
//   origin: "http://localhost:5173",
//   methods: "GET, POST, PUT, HEAD, DELETE, PATCH",
//   credentials: true,
// };

app.use(cors());
app.use(express.json());
app.use("/api/auth", router);
//app.use("/api/form", router); //It was a waste making this one
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server Up: ${process.env.PORT}`);
});
