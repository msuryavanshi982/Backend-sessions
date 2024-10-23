const authorModel = require("../models/authorModel");

// =============> Create Author's Data <==============
const createAuthor = async (req, res) => {
  try {
    let data = req.body;
    const {fname, lname} = data;

    if(!fname){
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

module.exports.createAuthor = createAuthor;
