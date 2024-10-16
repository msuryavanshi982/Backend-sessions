const { json } = require("express");
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
    return res.status(201).send({ status: true, message: user });
  } catch (err) {
    res.status(500).send({ status: false, message: err });
  }
};

module.exports = { createUser, getUser };
