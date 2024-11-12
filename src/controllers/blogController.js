const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");

// ========> CREATE BLOGS <============
const createBlog = async (req, res) => {
  try {
    let data = req.body;

    const { title, body, authorId, category, subcategory, tags } = data;

    let getAuthorData = await authorModel.findById(authorId);
    if (!getAuthorData) {
      return res
        .status(404)
        .send({ status: false, msg: `No author present by this ${authorId}` });
    }
    if (data["isPublished"] == true) {
      data["publishedAt"] = Date.now();
    }
    let createBlogs = await blogModel.create(data);
    res.status(201).send({
      status: true,
      msg: "Blogs created successfully",
      data: createBlogs,
    });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

// ===================> Get Blog Details <=====================
const getBlogs = async (req, res) => {
  try {
    let data = req.query;

    let { category, authorId, tags, subcategory } = data;
    let filter = { isDeleted: false, isPublished: true };

    let fetchBlogs = await blogModel.find(filter);
    if (fetchBlogs.length == 0) {
      return res
        .status(404)
        .send({ status: false, msg: "Such Blogs Not Available" });
    }
    return res.status(200).send({ status: true, data: fetchBlogs });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};

// ===================> Update Blogs Api <=====================
const updateBlog = async (req, res) => {
  try {
    let blogId = req.params.blogId;
    let data = req.body;

    let { title, body, tags, subcategory } = data;

    let updateQuery = { title: title, body: body };
    let addQuery = { tags: tags, subcategory: subcategory };

    const filterBlogs = await blogModel.findOne({
      $and: [{ isDeleted: false }, { isPublished: true }],
    });
    if (!filterBlogs) {
      return res
        .status(404)
        .send({ status: false, msg: "No filter possible are available" });
    }

    // WE ARE FINDING ONE BY BLOG ID AND UPDATING //
    let updatedblog = await blogModel.findOneAndUpdate(
      { _id: blogId },
      { $set: updateQuery, $push: addQuery, publishedAt: Date.now() },
      { new: true }
    );

    res.status(200).send({
      status: true,
      msg: "Blog is Updated Successfully",
      data: updatedblog,
    });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

// ============> Delete Blogs By blogId <==============
const deleteBlog = async (req, res) => {
  try {
    let blogId = req.params.blogId;

    let checkBlog = await blogModel.findById(blogId);
    if (!checkBlog) {
      return res
        .status(404)
        .send({ status: false, message: "no such blog exists" });
    }
    if (checkBlog.isDeleted) {
      return res
        .status(404)
        .send({ status: false, msg: "Blog is already deleted" });
    }
    let deleteData = await blogModel.findOneAndUpdate(
      { _id: blogId },
      { $set: { isDeleted: true, deletedAt: Date.now() } },
      { new: true }
    );
    res.status(200).send({
      status: true,
      msg: "Blog deleted successfully",
      data: deleteData,
    });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

// ============>Delete Blogs By Query Params <==============
const deleteByQuery = async (req, res) => {
  try {
    let data = req.query;

    let { category, authorId, tags, subcategory, isPublished } = data;
    let filter = { isDeleted: false };

    if (category || category == "") {
      // if (!isEmpty(category)) {
      //   return res
      //     .status(400)
      //     .send({ status: false, msg: "category must be present" });
      // }
      filter.category = category;
    }

    const deleteBlogs = await blogModel.updateMany(filter, {
      $set: { isDeleted: true, deletedAt: Date.now() },
    });

    return res
      .status(200)
      .send({ status: true, msg: "Blog Deleted Successfully" });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlog = updateBlog;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteByQuery = deleteByQuery;
