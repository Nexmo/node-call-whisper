// load environment variables
require('dotenv').config();

// initialize Nexmo with App credentials
var Nexmo = require('nexmo');
var nexmo = new Nexmo({
    apiKey: process.env['NEXMO_API_KEY'],
    apiSecret: process.env['NEXMO_API_SECRET'],
    applicationId: process.env['NEXMO_APP_ID'],
    privateKey: process.env['NEXMO_APP_FILE_NAME']
  });

// Define the topics for the inbound numbers
var topics = {}
topics[process.env['INBOUND_NUMBER_1']] = 'the summer offer';
topics[process.env['INBOUND_NUMBER_2']] = 'the winter offer';

// Set an index for the current conference ID
var conferenceID = 0;

module.exports = function(app){

  // Process an inbound call from an inbound
  // call made to one of the two numbers
  // we've set up
  app.get('/answer_inbound', function(req, res) {
    // increment the conference ID so
    // that every call has a unique conference
    conferenceID++;

    // create a new call from the number called
    // to the call center
    nexmo.calls.create({
      to: [{
        type: 'phone',
        number: process.env['CALL_CENTER_NUMBER']
      }],
      from: {
        type: 'phone',
        number: req.query.to
      },
      // when the second leg of this call is
      // set up we make sure to pass along the
      // conference ID
      answer_url: [
        'http://c.betta.io/answer_outbound?conference_id='+conferenceID
      ]
    }, function(err, suc) {
      console.log("Error:", err);
      console.log("Success:", suc);

      // When the call has been set up successfully
      // we connect the inbound call to a new
      // conference with the ID specified
      if (suc) {
        res.json([
          {
            "action": "talk",
            "text": "Please wait while we connect you"
          },
          // When we connect the inbound call to a conference
          // we keep them on hold and play a ringing sound
          // until the operator is connected
          {
            "action": "conversation",
            "name": "conversation-"+conferenceID,
            "startOnEnter": "false",
            "musicOnHoldUrl": ["https://nexmo-community.github.io/ncco-examples/assets/phone-ringing.mp3"]
          }
        ]);
      }
    });
  });

  // Process an outbound call to the call center,
  // playing a message to the call center operator
  // before connecting them to the conference ID
  app.get('/answer_outbound', function(req, res) {
    // we determine the topic of the call
    // based on the inbound call number
    var topic = topics[req.query.from]

    res.json([
      // We first play back a little message
      // telling the call center operator what
      // the call regards to. This "whisper" can
      // only be heard by the call center operator
      {
        "action": "talk",
        "text": "Incoming call regarding "+topic
      },
      // Next we connect the call to the same conference,
      // connecting the 2 parties
      {
        "action": "conversation",
        "name": "conversation-"+req.query.conference_id
      }
    ]);
  });
};
