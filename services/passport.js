const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//this is a mongoose model class and can be used to create an instance
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    //again, then cause it first need he other thing to be done
    done(null, user);
  });
});

//taking passport and saying how it should understand googleStrat
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback' //the route user gets sent to after granting permition on google
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //we already have an user with that id on our db
          done(null, existingUser);
        } else {
          //create instance of user in js and use save() to persist that on the db
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user)); //then cause it is async and should be done after
        }
      });
    }
  )
);
