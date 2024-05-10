const User = require("../models/user");
const bcrypt = require("bcrypt");

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

const getUsers = (req, res, next) => {
  return res.json({ users: usersList });
};

const getSingleUser = (req, res, next) => {
  const { uid } = req.params;
  const user = usersList.filter((user) => user.id === uid);

  return res.json({ user });
};

const updateUser = (req, res, next) => {
  const { name } = req.body;
  const { uid } = req.params;

  const user = usersList.filter((user) => user.id === uid);

  if (user.length !== 0) {
    user[0].name = name;
  } else {
    return res.status(404).json({ error: "ID not found!" });
  }
  return res.json({ user });
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

  res.status(201).json({ createdUser });
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
    isValidPassword = await bcrypt.compare(password, existingUser.password)
  } catch(err) {
    console.log(err)
  }
  console.log(isValidPassword, '< correctPass')

  if (!isValidPassword) {
    throw new Error('Invalid Password')
  }

  res.json({
    email: existingUser.email,
    username: existingUser.username
  })

};

exports.getUsers = getUsers;
exports.getSingleUser = getSingleUser;
exports.updateUser = updateUser;
exports.signup = signup;
exports.login = login;
