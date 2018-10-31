// create a new express server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());

// start the app and listen on port 5000
app.listen(app.get('port'), '127.0.0.1', () => console.log('Listening on port', app.get('port')));

module.exports = app;
