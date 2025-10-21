const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema(
  {},
  { strict: false, versionKey: false }
);
const Info = mongoose.model("info", infoSchema);

module.exports = Info;
