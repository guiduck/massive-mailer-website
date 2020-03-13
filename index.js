const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

const FacebookStrategy = require('passport-facebook').Strategy;

const mongoose = require('mongoose');
require('./models/User');
require('./services/passport');

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

const app = express();

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

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookAppSecret,
      callbackURL: '/auth/facebook/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id }).then(existingUser => {
        if (existingUser) {
          //we already have an user with that id on our db
          done(null, existingUser);
        } else {
          //create instance of user in js and use save() to persist that on the db
          new User({ facebookId: profile.id })
            .save()
            .then(user => done(null, user)); //then cause it is async and should be done after
        }
      });
    }
  )
);

app.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    scope: ['profile']
  })
);
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

//these are the cookie thingys - tells passport to use cookies to handle auth
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //time need to be in msecs
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//the require returns the function in module.exports and we immediatly invoke the function required
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
