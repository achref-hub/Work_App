var mongoose = require("mongoose");


var ParkingSchema = new mongoose.Schema({  
  date : {
    type: String,
    required: true
  },
  id_reservation:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Operation",
  },
  user: {},
  access : [],
  timeslot: String,
  id_spot : 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Desk",
  },
  status : String,
  isNotified: Boolean
  
  
 
});

ParkingSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("Parking", ParkingSchema);
