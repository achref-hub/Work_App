var mongoose = require("mongoose");


var BalanceSchema = new mongoose.Schema({  

  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  WFHweekBalance : [],
  WFHmonthBalance : [] 
}
);

BalanceSchema.plugin(require('mongoose-autopopulate'));



module.exports = mongoose.model("Balance", BalanceSchema);
