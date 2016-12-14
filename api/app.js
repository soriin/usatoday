var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var _ = require('lodash');
var app = express();
var rabbitService = require('./rabbit');

app.use(cors());

var PORT = process.env.PORT || 9124;

app.use(function(req, res, next) {
  if (req.hostname !== 'localhost') {
    res.end();
  }
  console.log('processing request:', req.url, req.method);
  next();
});
app.use(bodyParser.json());
var sum = 0;

app.get('/entries/sum', function(req, res) {
      rabbitService.getSum()
      .then(function(sum) {
          res.send(sum.toString());
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).end();
      });

});

app.post('/entries', function(req, res) {
  var val = req.body.value;

  if (_.isNumber(val)) {
    rabbitService.sendNewValue(val)
      .then(function() {
        res.end();
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).end();
      });
  } else {
    res.status(400).end();
  }
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send();
})

app.listen(PORT, function() {
  console.log('Now listening on', PORT);
});