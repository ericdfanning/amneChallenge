var fs = require('fs');
 
// change name of file to test different input
const a = 'amneExampleInput'
const b = 'input2'
const c = 'maxInput'

var file = b

fs.readFile(file, 'utf8', function(err, contents) {
  let firstLine = contents.split('\n')[0]
  let n = firstLine.split(' ')[0]
  let windoh = firstLine.split(' ')[1]
  let prices = contents.split('\n')[1].split(' ')
  solve(Number(n), Number(windoh), prices)

});

function solve(n, wind, prices) {
  var converted = helper(n, prices)
  console.log('converted', converted)
  wind = wind - 1
  var solution = ''

  var total = 0
  var obj = {}
  var count = 0
  var indexOfConverted = 0
  for (let j = 0; j < (n - (wind + 1) + 1); j++) {

  	for (let i = 0; i < converted.length; i++) {
  		if (total === wind) {
  			break
  		} else {
	  		if (Math.abs(converted[i]) > wind - total) {
	  			let b = wind - total
	  			total += wind - total
	  			if (converted[i] > 0) {
	  			  obj[count] = (b * b + b) / 2
	  			} else {
	  				obj[count] = -((b * b + b) / 2)
	  			}
	  		} else {
	  			total += Math.abs(converted[i])
	  			let b = Math.abs(converted[i])
	  			if (converted[i] > 0) {
	  			  obj[count] = (b * b + b) / 2
	  			} else {
	  				obj[count] = -((b * b + b) / 2)
	  			}
	  		}
  		}
  		count++
  	}
  	console.log('IT RAN', j)

		let sum = 0

		for (let key in obj) {
			sum += obj[key]
		}

	  solution += '\n' + sum

		total = 0
		count = 0

		if (Math.abs(converted[indexOfConverted]) === 0) {
			indexOfConverted++
		} 

		if (converted[indexOfConverted] > 0) {
			converted[indexOfConverted] = converted[indexOfConverted] - 1
		} else if (converted[indexOfConverted] < 0) {
			converted[indexOfConverted] = converted[indexOfConverted] + 1
		}
	}
  // console.log(solution)

  fs.writeFile('output', solution, function (err) {
    if (err) throw err;
  });

}

function helper(n, prices) {
    let converted = []
    let solution = []
    for (let i = 0; i < n ; i++) {

      prices[i] = Number(prices[i])
      prices[i + 1] = Number(prices[i + 1])

      if (i === n - 1) { 

      	let countPos = 0
      	let countNeg = 0

	      for (let i = 0; i < converted.length; i++) {
	      	if (converted[i] === 1) {
	      	  countPos++
	      	  if (countNeg > 0) {
	      	    solution.push(-countNeg)
	      	    countNeg = 0
	      	  } 
	      	} else if (converted[i] === -1 ) {
	      	  countNeg++
	      	  if (countPos > 0) {
	      	    solution.push(countPos)
	      	    countPos = 0
	      	  } 
	      	}
	      }
	      if (countPos) {
	        solution.push((countPos * countPos + countPos) / 2)
	      } else if (countNeg) {
	      	solution.push(-((countNeg * countNeg + countNeg) / 2))
	      }
        return solution
      }
      
      if (prices[i] > prices[i + 1]) { 
        // -1
        converted.push(-1)
      } else if (prices[i] < prices[i + 1]) {
        // 1
        converted.push(1)
      } else if (prices[i + 1] === prices[i + 1]) { 
        // 0
        converted.push(0)
      }
    }
  }