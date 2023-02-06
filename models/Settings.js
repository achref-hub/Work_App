var mongoose = require('mongoose');

var SettingsSchema = new mongoose.Schema({
  label: {
    type: String,
  },
  type:{
    type:String,
  },

  WFHweekBalance: Number,
  WFHmonthBalance: Number,
  grades : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade"
    },
]
});

SettingsSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Settings', SettingsSchema);
