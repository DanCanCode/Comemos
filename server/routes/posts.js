const router = require("express").Router();
const {
  getPosts,
  getSinglePost,
  updatePost,
  createPost,
} = require("../controllers/posts");

router.get("/", getPosts);

router.get("/:id", getSinglePost);

router.put("/:id", updatePost);

router.post("/", createPost);

module.exports = router;
