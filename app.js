var fb = require('facebook-chat-api')
var express = require('express')
var bodyParser = require('body-parser')
var s = express()
var Observer = require('./observer')
var observable = new Observer()

// Bitly
var Bitly = require('bitly');
var bitly = new Bitly('c511ade28b90c083955b68f42f5daaf53eb69ae6');

// URIjs
var URI = require('urijs');

// init
fb({
	email: process.env.FB_USER,
	password: process.env.FB_PASS
}, function callback(err, api) {
	if (err) return console.error(err)
		// Custom observable
	console.log('Forcing Login...')
	api.setOptions({
		forceLogin: true
	})
	observable.on('send', function(obj) {
		api.sendMessage(obj.message, obj.id, function(err) {
			if (err) {
				return console.error(err)
			}
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
s.use(bodyParser.json())
	.use(bodyParser.urlencoded({
		extended: false
	}))
	.post('/message', newMessage)
	.listen(4555, function() {

	})

// Callbacks
var goToSettingMessage = '\n\nขณะนี้เรากำลังทดสอบระบบการแจ้งเตือนด้วย Facebook ท่านสามารถเข้าไปปรับค่า Setting การรับข้อความได้ในเมนู "ตั้งค่า" ใน Account Fastwork.co ของท่าน'

function newMessage(req, res) {
	extractAndBitly(req.body.message, function(extracted) {
		observable.send(extracted + goToSettingMessage, req.body.id)
		res.json({
			success: true
		})
	})
}

// Extract message and bitly the link
function extractAndBitly(message, cb) {
	var url = URI.withinString(message, function(url) {
		bitly.shorten(url)
			.then(function(response) {
				var short_url = response.data.url

				message = message.replace(url, short_url)

				if (cb) {
					cb(message)
				}
				// Do something with data
			}, function(error) {
				throw error;
			});
		return false;
	});

	// Find url
	// Regex url

}