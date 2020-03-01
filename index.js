const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');
require('./models/User');
require('./services/passport');

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

const app = express();

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
