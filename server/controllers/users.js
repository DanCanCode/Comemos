const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const singleUser = await User.findOne({ _id: req.params.id })
      .populate({ path: "posts", select: "title tags image" })
      .populate({ path: "recipes", select: "title image mealType" })
      .then(function (post) {
        res.status(200).json(post);
      });
    res.status(200).json(singleUser);
  } catch (error) {}
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email });

    // Compare input password to hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({ user, token: generateToken(createdUser._id) });
    } else {
      res.status(400);
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const singleUser = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json(singleUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async () => {
  try {
    const removedUser = await User.deleteOne({ _id: req.params.id });
    res.json(removedUser);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash password
    const salt = bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const createdUser = await new User({
      username,
      email,
      password: hashedPassword,
    });
    createdUser.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
    res
      .status(200)
      .json({ createdUser, token: generateToken(createdUser._id) });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res) => {
  const { _id, username, email } = await User.findById(req.user.id);

  res.status(200).json({
    _id,
    username,
    email,
  });
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  getUsers,
  getSingleUser,
  loginUser,
  updateUser,
  deleteUser,
  getMe,
  createUser,
};
