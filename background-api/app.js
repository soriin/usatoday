
var amqp = require('amqplib');
var controller = require('./backgroundController');

amqp.connect('amqp://localhost').then(function(conn) {
  process.once('SIGINT', function() { conn.close(); });

  return conn.createChannel().then(function(ch) {
    ch.prefetch(1);
    var newValueQueue = 'usatodayQueueOfPower1';
    var sumRequestQueue = 'usatodayQueueOfPower2';
    return ch.assertQueue(newValueQueue, {durable: false})
      .then(function() {
        return ch.assertQueue(sumRequestQueue, {durable: false});
      })
      .then(function() {
        return ch.consume(newValueQueue, function(msg) {
          controller.handleNewValues(ch, msg);
        });
      })
      .then(function() {
        return ch.consume(sumRequestQueue, function(msg) {
          controller.handleSumRequest(ch, msg);
        });
      })
      .then(function() {
        console.log(' Awaiting requests');
      });
  });
}).catch(console.warn);