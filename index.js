const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

//taking passport and saying how it should understand googleStrat
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback' //the route user gets sent to after granting permition on google
    },
    accessToken => {
      console.log(accessToken);
    }
  )
);

//when user comes to this route, passport uses strategy called google
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['pofile', 'email']
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
