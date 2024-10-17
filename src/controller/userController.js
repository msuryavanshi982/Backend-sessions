const userModel = require("../model/userModel");

const createUser = async (req, res) => {
  try {
    const data = req.body;
    const obj = JSON.parse(JSON.stringify(data));

    const user = await userModel.create(obj);
    return res.status(201).send({ status: true, message: user });
  } catch (err) {
    res.status(500).send({ status: false, message: err });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.find();
    console.log({ mind: user });
    return res.status(200).send({ status: true, message: user });
  } catch (err) {
    res.status(500).send({ status: false, message: err });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateData = req.body;
    const user = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    return res.status(200).send({
      status: true,
      message: "User data updated successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).send({ status: false, message: err });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findByIdAndDelete(userId);
    return res.status(200).send({
      status: true,
      message: "User data deleted successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).send({ status: false, message: err });
  }
};

module.exports = { createUser, getUser, updateUser, deleteUser };
