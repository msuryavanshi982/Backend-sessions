const express = require("express");
const router = express.Router();
const { createUser, getUser } = require("../controller/userController");

router.post("/user", createUser);
router.get("/getuser", getUser);

module.exports = router;
