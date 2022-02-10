const asyncHandler = require("../middlewares/asyncHandlerFn");
const mongoose = require("mongoose");
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_EXPIRE = process.env.JWT_EXPIRE;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(process.env.USER_DBHOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// SIGN UP - Creates user model, adds salt to password, creates a JWT
exports.signup = asyncHandler(async (req, res) => {
  const { userId, email, password } = req.body;

  // Send userId, email and password to token service and get a session token

  // once a token comes back store the user data in db

  // send back success message with token to initial call

  res.status(200).json({ success: true, userId, email, password });

  // const newUser = new User(req.body);

  // const salt = await bcrypt.genSalt(10);
  // newUser.password = await bcrypt.hash(newUser.password, salt);

  // const payload = { id: user.id, username: user.username };
  // const token = jwt.sign(payload, JWT_SECRET, {
  //   expiresIn: JWT_EXPIRE,
  // });

  // const user = await newUser.save();
});

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ success: false, message: "No email found" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(401).json({ success: false, message: "Incorrect Password" });
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });

  res.status(200).json({ success: true, data: token });
};