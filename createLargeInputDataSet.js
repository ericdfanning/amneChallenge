var fs = require('fs');
 
var solution = ''
for (var i = 0; i < 200000; i++) {
	solution += Math.floor(getRandomArbitrary(80000, 1000000))
	if (i !== 199999) {
		solution += ' '
	}
}

fs.writeFile('maxInput', solution, 'utf-8', function(err, data) {
  if (err) throw err;
})

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}