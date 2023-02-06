var mongoose = require("mongoose");
var searchable = require("mongoose-regex-search");
var BuildingSchema = new mongoose.Schema({
  address: String,
  building_map: String,
  building_map_active: String,
  logo: String,
  Floors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Floor",
      autopopulate: true
    },
  ],
});
BuildingSchema.plugin(searchable);
BuildingSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Building", BuildingSchema);