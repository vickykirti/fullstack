const jwt = require("jsonwebtoken");
const NewUser = require("../models/user.model.js");

const jwtAuthMiddleware = async (req, res, next) => {
  const token = req.header("Authorization"); //works both in small and big in paranthesis
  //or when writing in an array can only use small letter "a" with "headers"
  //const token = req.headers["authorization"]
  if (!token) {
    return res
      .status(404)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }
  //const jwtToken = token.split(" ")[1];
  //or
  const jwtToken = token.replace("Bearer", "").trim();
  console.log(`JWT Authorization Middleware: ${jwtToken}`);
  try {
    const isVerified = jwt.verify(jwtToken, process.env.SECRET_KEY);
    const userData = await NewUser.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    console.log(userData);

    (req.user = userData), (req.token = token), (req.userID = userData._id);

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = jwtAuthMiddleware;
