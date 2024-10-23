const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");

let { createAuthor, loginAuthor } = authorController;
let { createBlog, getBlogs, updateBlog, deleteBlog, deleteByQuery } =
  blogController;

// ======> Author APIs <==========
router.post("/authors", createAuthor);

// ======> Blog APIs <===========
router.post("/blogs", createBlog);

router.get("/blogs", getBlogs);

router.put("/blogs/:blogId", updateBlog);

router.delete("/blogs/:blogId", deleteBlog);

router.delete("/blogs", deleteByQuery);

module.exports = router;
