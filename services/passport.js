const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//this is a mongoose model class and can be used to create an instance
const User = mongoose.model('users');

//taking passport and saying how it should understand googleStrat
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback' //the route user gets sent to after granting permition on google
    },
    (accessToken, refreshToken, profile, done) => {
      //create instance of user in js and use save() to persist that on the db
      new User({ googleId: profile.id }).save();
    }
  )
);
