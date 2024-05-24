const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findByIdAndUpdate } = require("../models/chat");

usersList = [
  {
    id: "1",
    name: "John",
  },
  {
    id: "2",
    name: "Peter",
  },
];

const getAllUsers = async (req, res, next) => {
  let allUsers;
  try {
    allUsers = await User.find({});
  } catch (err) {
    console.log(err);
  }
  return res.json({ users: allUsers });
};

const getSingleUser = async (req, res, next) => {
  const { uid } = req.params;

  let singleUser;

  try {
    singleUser = await User.find({ _id: uid });
  } catch (err) {
    console.log(err);
  }

  return res.json({ user: singleUser });
};

const updateUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  const { uid } = req.params;
  console.log(uid);
  console.log(req.body);

  const updateFields = {};
  if (username !== '') updateFields.username = username;
  if (email !== '') updateFields.email = email;
  if (password !== '') {
  try {
    const hashedPass = await bcrypt.hash(password, 12);
    updateFields.password = hashedPass
  } catch (err) {
    console.log(err, "error hashing pass");
  }

  }

  let updatedUser
  try {
    if (Object.keys(updateFields).length > 0) {
      updatedUser = await User.findByIdAndUpdate(uid, updateFields, {new: true});
    } else {
      return res.status(400).json({ message: 'No valid fields to update' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Updating user failed, please try again' });

  }

  console.log(updatedUser, 'updateduser');

  return res.json({ user: updatedUser });
  // const user = usersList.filter((user) => user.id === uid);

  // if (user.length !== 0) {
  //   user[0].name = name;
  // } else {
  //   return res.status(404).json({ error: "ID not found!" });
  // }
};

const signup = async (req, res, next) => {
  const { email, username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    console.log(existingUser, "existing user");
  } catch (err) {
    console.log(err, "error signing up");
  }

  if (existingUser) {
    throw new Error("User already exists");
  }

  const saltRounds = 12;
  let hashedPass;
  try {
    hashedPass = await bcrypt.hash(password, saltRounds);
  } catch (err) {
    console.log(err, "error hashing pass");
  }

  const createdUser = new User({
    email,
    username,
    password: hashedPass,
    chats: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
  }

  //generate token
  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
      },
      process.env.JWT_KEY
    );
  } catch (err) {
    console.log(err);
  }

  res.status(201).json({ createdUser, token });
};

// login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    console.log(existingUser, "existing user");
  } catch (err) {
    console.log(err);
  }

  if (!existingUser) {
    console.log("user not found, please register");
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    console.log(err);
  }
  console.log(isValidPassword, "< correctPass");

  if (!isValidPassword) {
    throw new Error("Invalid Password");
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      },
      process.env.JWT_KEY
    );
  } catch (err) {
    console.log(err);
  }

  res.json({
    email: existingUser.email,
    username: existingUser.username,
    _id: existingUser._id,
    token,
  });
};

exports.getAllUsers = getAllUsers;
exports.getSingleUser = getSingleUser;
exports.updateUser = updateUser;
exports.signup = signup;
exports.login = login;
