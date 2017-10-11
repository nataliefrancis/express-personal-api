var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var VacationSchema = new Schema({
  city: String,
  description: String,
  visited: {type: Boolean, default: false}
});

var Vacation = mongoose.model('Vacation', VacationSchema);

module.exports = Vacation;