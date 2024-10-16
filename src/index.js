const express = require("express");
const mongoose = require("mongoose");
const route = require("./router/route");
const app = express();

app.use(express.json());

const URL = "mongodb+srv://pst:pst123%40@cluster0.lgg8c.mongodb.net/user";
const PORT = 3000;

mongoose
  .connect(URL, { useUnifiedTopology: true })
  .then(() => console.log("mongodb is connected"))
  .catch((err) => {
    console.log(err);
  });

app.use("/", route);

app.listen(PORT, () => {
  console.log("App is running on port", `${PORT}`);
});
