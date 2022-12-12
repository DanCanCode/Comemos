const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tags: [String],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  image: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
