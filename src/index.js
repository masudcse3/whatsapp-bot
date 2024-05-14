/** @format */

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const { home } = require("./controllers");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static(path.join(__dirname, "public")));

app.use(
  morgan("dev"),
  cors(),
  express.json(),
  express.urlencoded({ extended: true })
);

app.get("/health", (req, res) => {
  res.status(200).json({
    code: 200,
    message: "OK",
  });
});
app.get("/", home);

// 404 error handler
app.use((req, res, next) => {
  const error = new Error("404 Not Found");
  error.status = 404;
  return res.status(404).json({
    code: 404,
    message: error.message,
  });
});
// global error handler
app.use((err, req, res, next) => {
  console.log("[ERROR]", err);
  return res.status(err.status || 500).json({
    code: err.status || 500,
    message: err.message || "Something went wrong",
  });
});
const port = 8500;
app.listen(port, async () => {
  const db = `mongodb+srv://jmrana:vF8ec4uYIVZn68Ae@cluster0.if0d3th.mongodb.net/`;
  await mongoose.connect(db, {
    dbName: "whatsapp-bot",
    serverSelectionTimeoutMS: 10000,
  });
  console.log(`Server listening on port ${port}`);
});
