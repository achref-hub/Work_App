var mongoose = require("mongoose");

var HistorySchema = new mongoose.Schema(
  {
    Reservation: {
      status: {
        type: String,
        enum: ["ACTIVE", "ENDED", "CANCELLED"],
      },
      timeslot: {
        type: String,
        enum: ["AM", "PM"],
      },

      desk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Desk",
      },
      reservationdate: {
        type: Date,
      },
    },
    isSystemOp: { type: Boolean, default: false },

    TransactionType: {
      type: String,
      enum: ["RESERVATION", "CANCELLATION", "CHECKIN", "CHECKOUT", "WFH_APPROVAL", "WFH_REJECTION", "WFH_SUBMISSION","WFH_CANCELLATION"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    Request: {
      status: {
        type: String,
        //enum: ["PENDING", "ACCEPTED", "REFUSED"],
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request'
      },
      idReciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      name: String,
      dates: []
    },
    WFH_Operation: {
      status: {
        type: String,
     //   enum: ["PENDING", "ACCEPTED", "REFUSED"],
      },
      timeslot : {
        type:String , 
       // required : true,
        enum : ['AM','PM'],
    },
      idReciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      Request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request'
      },
      date: {
        type:Date , 
      },
        },


  },
  { timestamps: true }
);

module.exports = mongoose.model("History", HistorySchema);
