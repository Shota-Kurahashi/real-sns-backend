const express = require("express");
const app = express();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const multer = require("multer");
const uploadRoute = require("./routes/upload");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

//データーベース接続
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("DBと接続中...");
  })
  .catch((err) => {
    console.log(err);
  });

//middleware
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/upload", uploadRoute);

app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(process.env.PORT || 8000, () => console.log("start"));
