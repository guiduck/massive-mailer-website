const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

//these are the cookie thingys - tells passport to use cookies to handle auth
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //time need to be in msecs
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

//the require returns the function in module.exports and we immediatly invoke the function required
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  //express serve production assets such as main.js or main.css
  app.use(express.static('client/build'));

  //if it doesn't recognize route, serve up index.html
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
