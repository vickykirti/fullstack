const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    // Normal way of catching errors
    // console.log(err.errors[0].message);
    // res.status(400).json({ message: err.errors[0].message });

    //Error Middleware
    const error = {
      status: 422,
      message: "Fill the details properly",
      extraDetails: err.errors[0].message,
    };
    next(error);
  }
};

module.exports = validate;
