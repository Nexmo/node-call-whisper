// load environment variable
// from .env file
require('dotenv').config();

// start a new app
var app = require('./app')

// handle all routes
require('./routes')(app);
