const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

let { createAuthor } = authorController;

// ======> Create Author Api <=========
router.post("/authors", createAuthor);

module.exports = router;
