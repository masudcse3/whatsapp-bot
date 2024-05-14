/** @format */

const { Schema, model } = require("mongoose");

const recordSchema = new Schema(
  {
    serial: Number,
    name: String,
    unit: String,
    project: String,
    mobile: String,
  },
  { timestamps: true }
);

const Record = model("Record", recordSchema);
module.exports = Record;
