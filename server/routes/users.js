const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  loginUser,
  updateUser,
  createUser,
} = require("../controllers/users");

router.get("/", getUsers);

router.get("/:id", getSingleUser);

router.put("/:id", updateUser);

router.post("/login", loginUser);

router.post("/signup", createUser);

module.exports = router;
