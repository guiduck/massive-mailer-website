const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  credits: { type: Number, default: 0 },
});

//this model func creates a new collection called users following userSchema described
mongoose.model('users', userSchema);
