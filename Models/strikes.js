const mongoose = require("mongoose");

const strikes = mongoose.Schema({
  memberID: String,
  strikeCount: Number,
  reasons: [String],
});
module.exports = mongoose.model("strikes", strikes);
