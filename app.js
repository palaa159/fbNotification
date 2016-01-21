var fb = require('facebook-chat-api')
var express = require('express')
var s = express()
var Observer = require('./observer')
var observable = new Observer()

// console.log(process.env.FB_USER)

// init
fb({
	email: process.env.FB_USER,
	password: process.env.FB_PASS
}, function callback(err, api) {
	if (err) return console.error(err)
		// Custom observable
	observable.on('send', function(obj) {
		api.sendMessage(obj.message, obj.id, function() {
			console.log('Message: "' + 
				obj.message + 
				'" was sent to ' +
				obj.id + ' on ' +
				new Date())
		})
	})

	// setTimeout(function() {
	// 	observable.send('hello apon', 681777115)
	// }, 2000)
})

s.post('/message', newMessage)

s.listen(4555, function() {

})

// Callbacks
function newMessage(req, res) {
	observable.send('คุณได้รับข้อความใหม่: ', 681777115)
}