var mongoose = require("mongoose");

var GroupSchema = new mongoose.Schema({
  Grades: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
      autopopulate: true,
    },
  ],
  ServiceLine: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceLine",
      autopopulate: true,
    },
  ],
  SubServiceLines: [String],
});

module.exports = mongoose.model("Group", GroupSchema);
