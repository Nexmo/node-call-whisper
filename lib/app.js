var express = require('express');
// var bodyParser = require('body-parser');

// create a new express server
var app = express();
app.set('port', (process.env.PORT || 5000));
// app.use(bodyParser.urlencoded({ extended: false }));

// start the app and listen on port 5000
app.listen(app.get('port'), '127.0.0.1', function() {
  console.log('SMS Proxy App listening on port', app.get('port'));
});

module.exports = app;
