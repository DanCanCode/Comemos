const router = require("express").Router();
const {
  getPosts,
  getSinglePost,
  updatePost,
  createPost,
  deletePost,
} = require("../controllers/posts");

router.get("/", getPosts);

router.get("/:id", getSinglePost);

router.put("/:id", updatePost);

router.post("/", createPost);

router.delete("/:id", deletePost);

module.exports = router;
