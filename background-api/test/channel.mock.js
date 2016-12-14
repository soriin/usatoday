var lastContentSent;

function sendToQueue(queue, buffer, config)
{
  lastContentSent = buffer.toString();
}

function ack() {

}

function getLastMessageContent() {
  return lastContentSent;
}

module.exports = {
  sendToQueue: sendToQueue,
  ack: ack,
  getLastMessageContent: getLastMessageContent
}