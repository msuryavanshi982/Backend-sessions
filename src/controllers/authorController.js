const authorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken");

// =============> Create Author's Data <==============
const createAuthor = async (req, res) => {
  try {
    let data = req.body;
    const { fname, lname } = data;

    if (!fname) {
      res.send("Fname is required");
    }
    // email = email.toLowerCase(); //if user send Email in uppercase so by using toLowerCase it convert auto lower case
    // let checkEmail = await authorModel.findOne({ email: email });
    // if (checkEmail) {
    //   return res
    //     .status(400)
    //     .send({ status: false, msg: `this email ${email} is already exist` });
    // }

    let createData = await authorModel.create(data);
    return res.status(201).send({
      status: true,
      msg: "Author has been created successfully",
      data: createData,
    });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

// ============> Author Login Api <====================
const loginAuthor = async (req, res) => {
  try {
    const data = req.body;

    let { email, password } = data;

    let checkCredentials = await authorModel.findOne({
      email: email,
      password: password,
    });
    if (!checkCredentials) {
      return res
        .status(401)
        .send({ status: false, message: "Provide invalid credentials." });
    }
    let token = jwt.sign(
      {
        authorId: checkCredentials._id.toString(),
        project: 1,
        college: "pst",
      },
      "blogging-site"
    );
    return res.status(200).send({
      status: true,
      msg: "Token has been generated",
      token: { token },
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.createAuthor = createAuthor;
module.exports.loginAuthor = loginAuthor;
