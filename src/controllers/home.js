/** @format */
const path = require("path");
const fs = require("fs");
const { generateMsg, record } = require("../utils");
const home = async (req, res, next) => {
  try {
    const dataSheet = req.params.id;
    console.log("Sheet", dataSheet);
    const { start = 0, end = 100 } = req.query;
    const dataPath = fs.readFileSync(
      path.join(__dirname, "../db", "data.json")
    );
    const jsonData = JSON.parse(dataPath);
    const data = jsonData[dataSheet].slice(start, end);
    res.render("index", { data, generateMsg, record });
  } catch (error) {
    next(error);
  }
};

module.exports = home;
