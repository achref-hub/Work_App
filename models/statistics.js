var mongoose = require("mongoose");

var StatisticsSchema = new mongoose.Schema({  
  // id_Ressource : 
  // {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Desk",
  //   autopopulate: true,
  // },
  // zone : String,
  // floor : String,
  // stats : [],
  // MonthStatsReservation : [],
  // MonthStatsCancellation : [],
  // MonthStatsCheckin : [],
  year: String,
  totalData : [],
  Reservations: [],
  Cancellations: [],
  Checkins: [],
  sls: []
  
});

StatisticsSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("Statistics", StatisticsSchema);
