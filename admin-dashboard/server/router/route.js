const express = require("express");
const router = express.Router();
const pageroutes = require("../controllers/controller.js");
const { signupSchema, loginSchema } = require("../validators/validator.js");
const validate = require("../middleware/validate.middleware.js");
const jwtAuthMiddleware = require("../middleware/jwt.middleware.js");
const adminMiddleWare = require("../middleware/admin.middleware.js");

router.route("/").get(pageroutes.home);
router.route("/register").post(validate(signupSchema), pageroutes.register);
router.route("/login").post(validate(loginSchema), pageroutes.login);
router.route("/contactform").post(pageroutes.contactform);
router.route("/user").get(jwtAuthMiddleware, pageroutes.user);
router.route("/service").get(pageroutes.service);

router
  .route("/admin")
  .get(jwtAuthMiddleware, adminMiddleWare, pageroutes.admin);
router
  .route("/getcontacts")
  .get(jwtAuthMiddleware, adminMiddleWare, pageroutes.getContact);
router
  .route("/delete/:id")
  .delete(jwtAuthMiddleware, adminMiddleWare, pageroutes.deleteUserById);
router
  .route("/:id")
  .get(jwtAuthMiddleware, adminMiddleWare, pageroutes.getUserById);
router
  .route("/update/:id")
  .patch(jwtAuthMiddleware, adminMiddleWare, pageroutes.updateUserById);
router
  .route("/contacts/delete/:id")
  .delete(jwtAuthMiddleware, adminMiddleWare, pageroutes.deleteUserContact);

module.exports = router;
