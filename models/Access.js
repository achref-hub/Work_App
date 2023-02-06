var mongoose = require("mongoose");
var searchable = require("mongoose-regex-search");

var AccessSchema = new mongoose.Schema({
status : {
    type: String,
    required:true,
    enum : ['GRANTED','BLOCKED'],
},
Users: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true,
  },
],
Zones: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Zone",
    autopopulate: true,
  },
],
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
SubServiceLine: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubServiceLine",
      autopopulate: true,
    },
],

});
AccessSchema.plugin(searchable);
AccessSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Access", AccessSchema);
