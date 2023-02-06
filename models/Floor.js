var mongoose = require("mongoose");
var searchable = require("mongoose-regex-search");
var FloorSchema = new mongoose.Schema({
  name: String,
  floor_map: String,
  floor_num : String,
  type : String,

  building: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Building",
  },
  Zones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone",
    },
  ],
});
FloorSchema.plugin(searchable);
FloorSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Floor", FloorSchema);