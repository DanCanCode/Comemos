const Post = require("../models/Post");

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate({
      path: "creator",
      select: "profilePic",
    });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
const getSinglePost = async (req, res, next) => {
  const singlePost = await Post.findOne({ _id: req.params.id })
    .populate({ path: "creator", select: "username profilePic" })
    .then(function (post) {
      res.status(200).json(post);
    })
    .catch((error) => {
      next(error);
    });
};

const updatePost = async (req, res, next) => {
  try {
    const singlePost = await Post.findByIdAndUpdate(req.params.id, req.body);
    res.json(singlePost);
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const createdPost = await new Post(req.body);
    createdPost.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
    res.status(200).json(createdPost);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const removedPost = await Post.deleteOne({ _id: req.params.id });
    res.json(removedPost);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  getSinglePost,
  updatePost,
  createPost,
  deletePost,
};
