require('should');
var Huobi = require('../index.js');

describe('huobi', function() {
	this.timeout(4000);

	it('should return btccny depth', function(done) {
		var huobi = new Huobi();
		huobi.subscribe({
			'marketDepthTopShort': [
				[{"symbolId":"btccny", "pushType":"pushLong"}],

				function cb(data, err) {
					if (cb.counter) return;
					cb.counter = 1;

					if (err) return done(err);
					data.should.have.property('bidPrice');
					done();
				}
			]
		});
	});
});
