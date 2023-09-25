const User = require("../schemas/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

const signupCtrl = async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email is already in use",
        data: "Conflict",
      });
    }
    try {
      const newUser = new User({ username, email });
      newUser.setPassword(password);
      await newUser.save();
      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          message: "Registration successful",
        },
      });
    } catch (e) {
      next(e);
    }
  }

  module.exports = signupCtrl;
