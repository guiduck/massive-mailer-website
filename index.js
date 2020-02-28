const express = require('express');
const mongoose = require('mongoose');
require('./models/User');
require('./services/passport');

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

const app = express();

//the require returns the function in module.exports and we immediatly invoke the function required
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
