const User = require("../models/User");
// const jwt = require("jsonwebtoken");

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
    const singleUser = await User.findOne({ _id: req.params.id });
    res.status(200).json(singleUser);
  } catch (error) {}
};

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json(user);
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

const createUser = async (req, res, next) => {
  try {
    const createdUser = await new User(req.body);
    createdUser.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
    res.status(200).json(createdUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  loginUser,
  updateUser,
  createUser,
};
