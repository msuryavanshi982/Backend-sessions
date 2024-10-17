const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");

router.post("/user", createUser);
router.get("/get", getUser);
router.put("/update/:userId", updateUser);
router.delete("/delete/:userId", deleteUser);

module.exports = router;
