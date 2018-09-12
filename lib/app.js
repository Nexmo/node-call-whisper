// create a new express server
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());

// start the app and listen on port 5000
app.listen(app.get('port'), '127.0.0.1', function() {
  console.log('Listening on port', app.get('port'));
});

module.exports = app;
