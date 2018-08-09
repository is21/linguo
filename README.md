# Linguo
Linguo is a Slack bot that corrects corporate-speak. Linguo uses the Google Cloud Natural Language API.

## Install Linguo

----

### 1. Deploy this repository to Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### 2. Create a Slack app
Visit the [Slack Apps](https://api.slack.com/apps) page and create a new app. Give your app a name, Linguo, and specify the workplace you would like Linguo to patrol.

### 4. Subscribe to Slack events
Visit the Events Subscriptions page for your Slack app and verify your request URL. Yours will look something like `https://random-name-1234.herokuapp.com/slack/events`.

Once you have verified your request URL, subscribe to the [messages.channels](https://api.slack.com/events/message.channels) event.

### 5. Create a Google Cloud project
[Sign up for Google Cloud account](http://console.cloud.google.com/) and then create a new project by visiting the [Manage Resources](https://console.cloud.google.com/cloud-resource-manager) page. You can name it whatever you'd like.

### 6. Add API credentials to your Heroku app
Now that you have set up all of the necessary accounts, add your API credentials to your Heroku app.

`GOOGLE_APPLICATION_CREDENTIALS`

`GOOGLE_PROJECT_ID`

`SLACK_TOKEN`

`SLACK_VERIFICATION_TOKEN`


And that's it. From now on, Linguo will correct a Slack user when they use corporate-speak (e.g. "What is your ask?").
