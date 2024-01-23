const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Z: Email is required",
    })
    .trim()
    .min(3, { message: "Z: Email must be atleast of 3 character" })
    .max(255, { message: "Z: Email must not be more than 255 characters" }),
  password: z
    .string({
      required_error: "Z: Password is required",
    })
    .trim()
    .min(3, { message: "Z: Password must be atleast of 3 character" })
    .max(255, { message: "Z: Password must not be more than 255 characters" }),
});

const signupSchema = loginSchema.extend({
  username: z
    .string({
      required_error: "Z: Name is required",
    })
    .trim()
    .min(3, { message: "Z: Name must be atleast of 3 character" })
    .max(255, { message: "Z: Name must not be more than 255 characters" }),
  phone: z.number({
    required_error: "Z: Phone Number is required",
  }),
});

module.exports = { signupSchema, loginSchema };

//you can even use like this no need to destructure but at the NewRoute.js than
//you would have to use the same validate middleware
//module.exports = signupSchema;

// Originally Zod was only validating Signup/Registration Credential

// const { z } = require("zod");

// const signupSchema = z.object({
//   username: z
//     .string({
//       required_error: "Z: Name is required",
//     })
//     .trim()
//     .min(3, { message: "Z: Name must be atleast of 3 character" })
//     .max(255, { message: "Z: Name must not be more than 255 characters" }),
//   email: z
//     .string({
//       required_error: "Z: Email is required",
//     })
//     .trim()
//     .min(3, { message: "Z: Email must be atleast of 3 character" })
//     .max(255, { message: "Z: Email must not be more than 255 characters" }),
//   phone: z.number({
//     required_error: "Z: Phone Number is required",
//   }),
//   password: z
//     .string({
//       required_error: "Z: Password is required",
//     })
//     .trim()
//     .min(3, { message: "Z: Password must be atleast of 3 character" })
//     .max(255, { message: "Z: Password must not be more than 255 characters" }),
// });

// module.exports = signupSchema;
