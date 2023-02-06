var mongoose = require("mongoose");
var searchable = require("mongoose-regex-search");
var ZoneSchema = new mongoose.Schema({
  name: String,
  
  floor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Floor",   
    autopopulate: true,
  },

  Desks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Desk",
     // autopopulate: true,
    },
  
  ],
   
});

ZoneSchema.plugin(searchable);
ZoneSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Zone", ZoneSchema);
