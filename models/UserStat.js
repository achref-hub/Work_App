var mongoose = require("mongoose");

var UserStatSchema = new mongoose.Schema(
  {
    date : Date,
    Users : [
      {
        _id :  {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          ref: "User"
      },
        firstname: String,
        lastname: String,
        Email: String,
        grade:  {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          ref: "Grade",
          autopopulate: true,
      },
        serviceLine: {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          ref: "ServiceLine",
          autopopulate: true,
      },
        subServiceLine: String,
        nbReservations : 0,
        nbCancellations : 0,
        nbCheckins : 0,
        nbCheckouts : 0,
        nbSystemCancellations : 0
      }
      
    ]
  }

);



UserStatSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("UserStat", UserStatSchema);
