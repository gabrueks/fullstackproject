const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  facebookId: String
});

mongoose.model('facebookUsers', userSchema);
