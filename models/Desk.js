var mongoose = require("mongoose");
const { BookDesk } = require("../services/DeskService");

var DeskSchema = new mongoose.Schema({  
  name: String,
  isBlocked: Boolean,
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Zone",
  },

  reservations: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation", 
    autopopulate: true,  
    },
  ],
  coordinations_web_am: { type: String },
  coordinations_web_pm: { type: String },
  cordination_mobile_x: { type: String },
  cordination_mobile_y: { type: String },
  startFreeDate: { type: Date },
  endFreeDate: { type: Date },
  QRCode: String,
});

DeskSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("Desk", DeskSchema);
