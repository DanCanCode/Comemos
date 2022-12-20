const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  loginUser,
  updateUser,
  deleteUser,
  getMe,
  createUser,
} = require("../controllers/users");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getUsers);

router.get("/:id", getSingleUser);

router.put("/:id", updateUser);

router.get("/me", protect, getMe);

router.post("/login", loginUser);

router.post("/signup", createUser);

router.delete("/delete", deleteUser);

module.exports = router;
