const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.send(process.env.GOOGLE_APPLICATION_CREDENTIALS);
});

// start the server
app.listen(port, function() {
  console.log('Listening')
});
