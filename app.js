const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const createSlackEventAdapter = require('@slack/events-api').createSlackEventAdapter;
const slackEvents = createSlackEventAdapter(process.env.SLACK_VERIFICATION_TOKEN);

const dotenv = require('dotenv').config();
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient({
  projectId: process.env.GOOGLE_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

const { WebClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

const words = require('./words.json').words;

var message = {
  "channel": "",
  "text": ""
}

app.use(bodyParser.json());

app.use('/slack/events', slackEvents.expressMiddleware());

slackEvents.on('message', function(event) {
  if(event && event.user) {
    console.log(`Incoming message "${event.text}" from user ${event.user} at ${event.ts} on channel ${event.channel}`);
    message.channel = event.channel;
    message.text = event.text;
    return matchWords(message.text);
  }
});

slackEvents.on('error', console.error);

function matchWords(message) {
  for(x in words) {
    const regex = new RegExp(words[x].word, 'i');
    if(message.match(regex) && words[x].improperTag) {
      return prepareDocument(message);
    }
    else if(message.match(regex) && !words[x].improperTag) {
      return reprimandUser(words[x].reprimand);
    }
  }
};

function prepareDocument(message) {
  document = {
    content: message,
    type: 'PLAIN_TEXT',
  };
  detectInfraction(document);
};

function detectInfraction(document) {
  client.analyzeSyntax({document: document}).then(function (results) {
      tokens = results[0].tokens;
      for (x in tokens) {
        for (y in words) {
          if (tokens[x].text.content == words[y].word && tokens[x].partOfSpeech.tag == words[y].improperTag) {
            return reprimandUser(words[y].reprimand);
          }
        }
      }
  })
  .catch(function (err) {
    console.error(err);
  });
};

function reprimandUser(reprimand) {
  web.chat.postMessage({ channel: message.channel, text: reprimand, as_user: false}).then(function (res) {
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);
};

app.listen(port, function() {
  console.log('Listening')
});
