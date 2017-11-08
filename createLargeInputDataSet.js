var fs = require('fs');
 
var solution = ''
for (var i = 0; i < 200000; i++) {
	solution += Math.floor(getRandomArbitrary(80000, 1000000))
	if (i !== 199999) {
		solution += ' '
	}
}

// create temp file to capture data and add your own constraints
fs.writeFile(FILE_NAME, solution, 'utf-8', function(err, data) {
  if (err) throw err;
})

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
// var today = new Date();
// var secondDate = new Date(2017,10,24, 14, 00, 00);

// var diffDays = Math.round(Math.abs((secondDate.getHours() - today.getHours())/(oneDay)));



// https://jsfiddle.net/ubqya9sp/27/


