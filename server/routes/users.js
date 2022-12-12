const router = require("express").Router();
const {
  getUsers,
  loginUser,
  updateUser,
  createUser,
} = require("../controllers/users");

router.get("/", getUsers);

router.put("/:id", updateUser);

router.post("/login", loginUser);

router.post("/signup", createUser);

module.exports = router;
