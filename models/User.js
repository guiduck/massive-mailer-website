const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

//this model func creates a new collection called users following userSchema described
mongoose.model('users', userSchema);
