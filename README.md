# Add a Call Whisper using Node and the Nexmo Voice API

This app used the Nexmo Voice APIs to demonstrate how add a Voice Whisper to a call, letting the

## Prerequisites

You will need:

* A [free Nexmo account](https://dashboard.nexmo.com/sign-up)
* The [Nexmo CLI](https://github.com/Nexmo/nexmo-cli) installed
* A way to run a local server on a public port, for example [Ngrok](https://ngrok.com/).


## Installation

```sh
git clone https://github.com/nexmo/node-call-whisper.git
cd node-call-whispher
npm install
```

## Setup

### Buy Numbers & Create Application

To run this application we need to buy 2 numbers, set up an application, and tie the numbers to this application.

```sh
# create an application
> nexmo app:create "Whisper System" http://your.domain/answer_inbound http://your.domain/event --type voice --keyfile app.key
# check the application ID
> nexo app:list
12345678-1234-1234-1234-1234567890 | Whisper System
# purchase 2 numbers
> nexmo number:buy 4420 -c GB  --confirm
Number purchased: 442055555555
> nexmo number:buy 4420 -c GB  --confirm
Number purchased: 442055555556
# link the numbers to the application ID
> nexmo link:app 442055555555 12345678-1234-1234-1234-1234567890
> nexmo link:app 442055555556 12345678-1234-1234-1234-1234567890
```

### Run Server

The next step is to set up all of our variables in a `.env` file. You can start off by copying the example file.

```sh
mv .env.example .env
```

Fill in the values in `.env` as appropriate, where `INBOUND_NUMBER_1` and `INBOUND_NUMBER_2` are the numbers you just purchased, `CALL_CENTER_NUMBER` is the number you want them to direct to, and `NEXMO_APP_FILE_NAME` is the file name of your application key (`app.key`).

With this in place you can start the server.

```sh
npm start
```

The application should be available on <http://localhost:5000>. For this to work full though, make sure to expose your server on a public domain (e.g. `your.domain` in the example above) using a tool like [Ngrok](https://ngrok.com/).

## Using the App

To use the app you need two phones, or a phone and something like Skype to make the first call.

With your server running, call either of the 2 numbers you purchased. Nexmo will then make a call to `http://your.domain/answer_inbound` which puts the inbound call on hold. A call is then made to the `CALL_CENTER_NUMBER`(your other phone) where a message is played regarding the nature of the call before both parties are connected to the same conference.
