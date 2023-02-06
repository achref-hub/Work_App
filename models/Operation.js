var mongoose = require("mongoose");
var searchable = require("mongoose-regex-search");
const Settings = require("./Settings");

var OperationSchema = new mongoose.Schema({
    request : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",   
      },
    date: {
      type:Date , 
    },
    status: {
        type:String , 
        enum : ['ACTIVE','ENDED','CANCELLED','CLOSED'],},
   timeslot :{
          type : String,
          enum :['AM','PM'],
        },
        UserNotif: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }],
       slot: {  
        type:mongoose.Schema.Types.String , 
        ref:"Settings",
        // required:true,
        },
    OperationType:{
      type : mongoose.Schema.Types.String,
      ref: "Settings",
    },
    user: 
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   
    },
    manager: 
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
    },
    date_debut: {
      type: Date,
      // required : true,
    },
    date_fin:{
      type: Date,
      // required : true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "refused"],
      default: "pending",
    },
    type : String,
    guest: String,
  },{timestamps:true});
OperationSchema.plugin(searchable);
OperationSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Operation", OperationSchema);