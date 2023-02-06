var mongoose = require("mongoose");

var IndividualAccessSchema = new mongoose.Schema({

    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",   
      },


    Zones: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Zone",
        autopopulate: true,
      },
  ]
}
);

module.exports = mongoose.model("IndividualAccess", IndividualAccessSchema);
