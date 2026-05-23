// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const User =
// require("../models/User");

// const router =
// express.Router();


// // USER SIGNUP
// router.post(
// "/signup",
// async (req, res) => {

// try {

// const {
// name,
// age,
// gender,
// email,
// phone,
// fitnessGoals,
// password
// } = req.body;

// const existingUser =
// await User.findOne({ email });

// if (existingUser) {
// return res.status(400)
// .json({
// message:
// "Email already exists"
// });
// }

// const hashedPassword =
// await bcrypt.hash(
// password,
// 10
// );

// const user =
// await User.create({
// name,
// age,
// gender,
// email,
// phone,
// fitnessGoals,
// password:
// hashedPassword
// });

// res.status(201).json({
// message:
// "Registration Successful",
// user
// });

// } catch (error) {
// res.status(500).json({
// message:
// error.message
// });
// }
// });


// // LOGIN
// router.post(
// "/login",
// async (req, res) => {

// try {

// const {
// email,
// password
// } = req.body;


// // ADMIN LOGIN
// if (
// email ===
// "admin@gmail.com" &&
// password ===
// "admin123"
// ) {

// const token =
// jwt.sign(
// {
// role: "admin"
// },
// process.env.JWT_SECRET,
// {
// expiresIn: "7d"
// }
// );

// return res.json({
// message:
// "Admin Login Success",
// role: "admin",
// token
// });
// }

// const user =
// await User.findOne({
// email
// });

// if (!user) {
// return res.status(400)
// .json({
// message:
// "User Not Found"
// });
// }

// if (user.blocked) {
// return res.status(403)
// .json({
// message:
// "Account Blocked"
// });
// }

// const isMatch =
// await bcrypt.compare(
// password,
// user.password
// );

// if (!isMatch) {
// return res.status(400)
// .json({
// message:
// "Wrong Password"
// });
// }

// const token =
// jwt.sign(
// {
// id: user._id,
// role: "user"
// },
// process.env.JWT_SECRET,
// {
// expiresIn: "7d"
// }
// );

// res.json({
// message:
// "Login Success",
// token,
// user
// });

// } catch (error) {
// res.status(500).json({
// message:
// error.message
// });
// }
// });

// module.exports =
// router;


const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post("/login", async (req, res) => {
  try {

    const {
      email,
      password
    } = req.body;

    // Admin login
    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {
      return res.json({
        role: "admin",
        token: "admin-token"
      });
    }

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password"
      });
    }

    const token =
      jwt.sign(
        { id: user._id },
        "secretkey",
        { expiresIn: "7d" }
      );

    res.json({
      token,
      role: "user"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;