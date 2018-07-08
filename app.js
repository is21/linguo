var express = require('express');
var app = express();

app.listen(process.env.PORT || 3000, function() {
  console.log('Grammar Police server listening.')
});

app.get('/', function(req, res) {
  res.send('Hello World');
});
