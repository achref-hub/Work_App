var mongoose = require("mongoose");
var searchable = require("mongoose-regex-search");

var ReservationSchema = new mongoose.Schema({

    
    status: {
        type:String , 
        enum : ['ACTIVE','ENDED','CANCELLED'],},
    timeslot : {
        type:String , 
        required : true,
        enum : ['AM','PM'],},
   
    user: 
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   
    },

    desk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Desk",   
     },
    reservationdate : {
      type:Date , 
      required : true,
    },


  },{timestamps:true});
ReservationSchema.plugin(searchable);
ReservationSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Reservation", ReservationSchema);
