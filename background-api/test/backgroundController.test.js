var expect = require('chai').expect;
var backgroundController = require('../backgroundController');
var messageMock;
var channelMock;

describe('Backgroung Controller', function() {

  beforeEach(function() {
    messageMock = require('./message.mock');
    channelMock = require('./channel.mock');
  });

  it('should exist', function() {
    expect(backgroundController).to.exist;
  });

  it('should default sum to 0', function() {
    backgroundController.handleSumRequest(channelMock, messageMock);
    expect(channelMock.getLastMessageContent()).to.equal('0');
  });

  it('should update sum on new entries', function() {
    messageMock.content = '2';
    backgroundController.handleNewValues(channelMock, messageMock);
    backgroundController.handleSumRequest(channelMock, messageMock);
    expect(channelMock.getLastMessageContent()).to.equal('2');
  });
});