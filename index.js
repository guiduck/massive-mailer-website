const express = require('express');
require('./services/passport');

const app = express();

//the require returns the function in module.exports and we immediatly invoke the function required
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
