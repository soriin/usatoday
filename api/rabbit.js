var amqp = require('amqplib');
var Promise = require('bluebird');
var uuid = require('node-uuid');

var myChannel;

amqp.connect('amqp://localhost').then(function(conn) {
  process.once('SIGINT', function() { conn.close(); });

  return conn.createChannel().then(function(ch) {
    myChannel = ch;
  });
}).catch(console.warn);

function sendNewValue(value) {
  return new Promise(function(resolve, reject) {
    var corrId = uuid();
    function processResponse(msg) {
      if (msg.properties.correlationId === corrId) {
        resolve(msg.content.toString());
      }
    }

    setupResponseQueue(processResponse)
      .then(function(queue) {
        console.log('Sending new value %d', value);
        myChannel.sendToQueue('usatodayQueueOfPower1', new Buffer(value.toString()), {
          correlationId: corrId, replyTo: queue
        });
      })
      .catch(function(err) {
        console.error(err);
        reject(err);
      });
  });
}

function getSum() {
  return new Promise(function(resolve, reject) {
    var corrId = uuid();
    function processResponse(msg) {
      if (msg.properties.correlationId === corrId) {
        resolve(msg.content.toString());
      }
    }

    setupResponseQueue(processResponse)
      .then(function(queue) {
        console.log('Requesting current sum');
        myChannel.sendToQueue('usatodayQueueOfPower2', new Buffer(''), {
          correlationId: corrId, replyTo: queue
        });
      })
      .catch(function(err) {
        console.error(err);
        reject(err);
      });
  });
}

function setupResponseQueue(handler) {
  return Promise.try(function(){
    return myChannel.assertQueue('', {exclusive: true});
  })
  .then(function(response) {
    return myChannel.consume(response.queue, handler, {noAck: true})
      .then(function() { return response.queue; });
  });
}

module.exports = {
  sendNewValue: sendNewValue,
  getSum: getSum
};