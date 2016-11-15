var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true}},
  firstname: { type: String, required: true},
  lastname: { type: String, required: true},
  email: String,
  password: { type: String, required: true},
});


mongoose.model('User', UserSchema);

