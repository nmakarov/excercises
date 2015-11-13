
var phantomPath = require('phantomjs').path || '/usr/local/bin/phantomjs';
console.info('pp:', phantomPath);

exit();
var pa11y = require('pa11y');
// var page = require('webpage').create();
// var timeStart = Date.now();
var url = "http://nature.com";

console.info('>> ', process.argv);
var test = pa11y({
	// debug: console.log.bind(console),
	// error: console.error.bind(console),
	// info: console.log.bind(console)
});

test.run('nature.com', function (err, res) {
	if (err) {
		return console.info('err:', err);
	}
	var stats = {};
	res.forEach(function (el) {
		stats[el.type] = stats[el.type] ? stats[el.type] + 1 : 1;

	});
	console.info(stats);
	// console.info('>> pa11y:', res);
});

// page.open(url, function (status) {
// 	try {
// 		if (status !== 'success') {
// 			throw "can't open " + url;
// 		}
// 	} catch (err) {
// 		console.info('Error: ', err);
// 	} finally {
// 		console.info('Done, took ' + (Date.now() - timeStart) + ' ms');
// 		phantom.exit();
// 	}
// });
