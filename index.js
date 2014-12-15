var io = require('socket.io-client');

function Huobi(channels) {
	if (channels) {
		this.subscribe(channels);
	}
}

Huobi.prototype.subscribe = function(channels) {
	var options = {reconnection: true};
	var socket = io.connect('hq.huobi.com:80', options);

	socket.on('connect', function() {
		var symbolList = {};
		Object.keys(channels).forEach(function(name) {
			symbolList[name] = channels[name][0];
		});

		var data = {"symbolList":symbolList, "version":1, "msgType":"reqMsgSubscribe","requestIndex":Date.now()};
		socket.emit('request', data);
	});

	socket.on('message', function(data) {
		var callback = channels[data['msgType']][1];
		if (!callback) return;

		callback(data['payload']);
	});
};

module.exports = Huobi;
