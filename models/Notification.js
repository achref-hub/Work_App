var mongoose = require("mongoose");

var NotificationSchema = new mongoose.Schema(
  {
    idReciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }, 
     idSender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    Operation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Operation",
    },
    isSystemOp: { type: Boolean, default: false },
 
    Request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    
    },
    Action: {
      type: String,
    },
    message :{
      type:String
    },
    title :{
      type:String
    },
    channel :[]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
