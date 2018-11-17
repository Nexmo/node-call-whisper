// load environment variables
require('dotenv').config();

// Define the topics for the inbound numbers
let topics = {}
topics[process.env['INBOUND_NUMBER_1']] = 'the summer offer';
topics[process.env['INBOUND_NUMBER_2']] = 'the winter offer';

module.exports = function(app){

  // Process an inbound call from an inbound call made to one of the two numbers
  // we've set up
  app.get('/answer', function(req, res) {
    let answer_url = 'http://'+process.env['DOMAIN']+'/on-answer'

      res.json([
        {
          "action": "talk",
          "text": "Thanks for calling. Please wait while we connect you"
        },
        {
          "action": "connect",
          "from": req.query.to,
          "endpoint": [{
            "type": "phone",
            "number": process.env['CALL_CENTER_NUMBER'],
            "onAnswer": {"url": answer_url}
          }]
        }
      ]);
  });

  // Handle the call center answering the phone, prompt them with information
  app.get('/on-answer', function(req, res) {
    // we determine the topic of the call based on the inbound call number
    let topic = topics[req.query.from]

    res.json([
      // We first play back a little message telling the call center operator what
      // the call relates to. This "whisper" can only be heard by the call center operator
      {
        "action": "talk",
        "text": "Incoming call regarding "+topic
      }
    ]);
  });

  app.post('/event', function(req, res) {
      // uncomment to get the full detail of every event
      // console.log(req.body);

      console.log("Event Info: " + req.body.status);
  });
};
