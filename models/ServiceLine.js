var mongoose = require("mongoose");
var searchable = require("mongoose-regex-search");

var ServiceLineSchema = new mongoose.Schema({
serviceLine : {
    type: String,
    required:true
},
Users: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true,
  },
],
SubServiceLines: [String],
Accesses: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Access",
    autopopulate: true,
  },

],
});
ServiceLineSchema.plugin(searchable);
ServiceLineSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("ServiceLine", ServiceLineSchema);
