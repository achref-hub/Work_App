var mongoose = require("mongoose");
var searchable = require("mongoose-regex-search");

var AvailabilitySchema = new mongoose.Schema({
  date :{
      type :String,
  },
  statusAM :{
      type :String,
      enum :["BLOCKED","AVAILABLE","BOOKED","OCCUPIED","AVAILABLE"],
  },
  statusPM:{
    type :String,
    enum :["BLOCKED","AVAILABLE","BOOKED","OCCUPIED","AVAILABLE"],
},
  UserAM:{
      type :String,
  },
  UserPM:{
      type:String,
  },
  Floor :{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Floor",
      autopopulate :true,
  },
  Desk :{
    type: mongoose.Schema.Types.ObjectId,
    ref :"Desk",
    autopopulate: true,
  }
 

})
AvailabilitySchema.plugin(searchable);
AvailabilitySchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Availability", AvailabilitySchema);