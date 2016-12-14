var _ = require('lodash');

var internalStorageSum = 0;

function incrementSum(value) {
  if (_.isNumber(value)) {
    internalStorageSum += value;
  }
}

function getSum() {
  return internalStorageSum;
}

function handleNewValues(ch, msg) {
  var n = parseInt(msg.content.toString());
  console.log('Adding %d to sum', n);
  incrementSum(n);
  var newSum = getSum();
  console.log('New sum:', newSum);
  ch.sendToQueue(msg.properties.replyTo,
                  new Buffer(newSum.toString()),
                  {correlationId: msg.properties.correlationId});
  ch.ack(msg);
}

function handleSumRequest(ch, msg) {
  var currentSum = getSum();
  console.log('Responding to sum request with:', currentSum);
  ch.sendToQueue(msg.properties.replyTo,
                  new Buffer(currentSum.toString()),
                  {correlationId: msg.properties.correlationId});
  ch.ack(msg);
}

module.exports = {
  handleNewValues: handleNewValues,
  handleSumRequest: handleSumRequest
};