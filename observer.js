// Observerable
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function trigger() {
	EventEmitter.call(this);
}

trigger.prototype.find = function(email, cb) {
	this.emit('find', {
		email: email,
		cb: cb
	})
}

trigger.prototype.send = function(message, id) {
	this.emit('send', {
		message: message,
		id: id
	});
}

util.inherits(trigger, EventEmitter);

module.exports = trigger