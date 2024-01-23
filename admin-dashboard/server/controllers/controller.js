const NewUser = require("../models/user.model.js");
const ContactForm = require("../models/contactform.model.js");
const Service = require("../models/services.model.js");

const home = async (req, res) => {
  try {
    res.status(200).send("New Main Page Route Created");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await NewUser.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }

    const newuser = await NewUser.create({ username, email, phone, password });

    console.log(newuser);
    return res.status(200).json({
      NewUserCreated: newuser,
      token: await newuser.generateToken(),
      userId: newuser._id.toString(),
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await NewUser.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Incorrect Credential" });
    } else {
      //const user = await bcrypt.compare(password, userExist.password);
      //making our MongoDB Schema Method and comparing from within function
      const user = await userExist.comparePassword(password);
      if (user) {
        res.status(200).json({
          UserLoggedIn: "Login Successfull",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
        });
      } else {
        res.status(401).json({ message: "Invalid Credential" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const contactform = async (req, res) => {
  try {
    const response = req.body;
    await ContactForm.create(response);
    res.status(200).json({ message: "Message Received Successfully" });
  } catch (error) {
    res.status(400).json({ message: "Message Not Received" });
  }
};

const user = async (req, res) => {
  const userData = req.user;
  try {
    res.status(200).json({ userData });
  } catch (error) {
    res.status(400).json({ message: "User Route Failed" });

    console.log(error);
  }
};

const service = async (req, res) => {
  try {
    const response = await Service.find();
    res.status(200).json({ message: response });
    return;
  } catch (error) {
    res.status(400).json({ message: "User Route Failed" });

    console.log(error);
  }
};

const admin = async (req, res) => {
  try {
    const users = await NewUser.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res) => {
  try {
    const users = await ContactForm.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      await NewUser.deleteOne({ _id: id });
      return res.status(200).json({ message: "User Deleted Successfully!" });
    }
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const data = await NewUser.findOne({ _id: id });
      return res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;
    if (id) {
      const data = await NewUser.updateOne(
        { _id: id },
        { $set: updatedUserData }
      );
      return res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

const deleteUserContact = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      await ContactForm.deleteOne({ _id: id });
      return res.status(200).json({ message: "Contact Deleted Successfully!" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  home,
  register,
  login,
  contactform,
  user,
  service,
  admin,
  getContact,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteUserContact,
};
