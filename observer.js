// Observerable
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function messageTrigger() {
	EventEmitter.call(this);
}

messageTrigger.prototype.send = function(message, id) {
	this.emit('send', {
		message: message,
		id: id
	});
}

util.inherits(messageTrigger, EventEmitter);

module.exports = messageTrigger