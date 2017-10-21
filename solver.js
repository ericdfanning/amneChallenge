var fs = require('fs');

// ******* IF USED IRL, MEMOIZE THE FUNCTION TO IMPROVE SPEED BY CREATING CONSTANT TIME LOOKUP *******
 
// change name of file to test different input
const a = 'amneExampleInput'
const b = 'input2'
const c = 'maxInput'

var file = a

fs.readFile(file, 'utf8', function(err, contents) {
	let firstLine = contents.split('\n')[0]
	let n = firstLine.split(' ')[0]
	let windoh = firstLine.split(' ')[1]
	let prices = contents.split('\n')[1].split(' ')
  solve(Number(n), Number(windoh), prices)
});

var scale = {
	bgnLngt: 0,
	bgnVal: 0,
	endLngt: 0,
	endVal: 0,
	endNum: 0,
	curVal: 0
}

function solve(n, wind, prices) {
	var solution = ''

	// solution += helper(0, wind, prices.slice(0, 0 + wind))
	// addOthers(prices[wind], scale.bgnLngt, scale.bgnVal)
	// iterate over the prices array up until a full window can not be completed
  for (let i = 0; i < prices.length - wind + 1; i++) {
  	solution += helper(i, wind, prices.slice(i, i + wind))
  	if (i !== prices.length - wind) { // if on the last value, disregard the new line for formats sake
  		solution += '\n'
  	}
  }
  // write the answers to output file
  // console.log(solution)
  fs.writeFile('output', solution, 'utf-8', function(err, data) {
    if (err) throw err;
  })
}

function addOthers(nextNum, bgnLngt, bgnVal) {
  // handle beginning
  var temp = doTheMath(bgnLngt)
  if (bgnVal < 0) {
  	temp = -temp
  }


	// handle end
	if (nextNum > scale.endNum) {
		console.log('increasing')
	} else if (nextNum < scale.endNum) {
		console.log('decreasing')
	} else {
		console.log('same number')
	}
	console.log('next num ', nextNum)
}

function helper(index, wind, prices) {
  let count = 0
  let increasing = []
  let decreasing = []
  let total;

  var cache = []

	var first = true
	for (let i = 0; i < wind ; i++) {
		// console.log(prices)
		// since fs.readFile() returns input prices as strings,
		// convert home prices back to a number
		prices[i] = Number(prices[i])
		prices[i + 1] = Number(prices[i + 1])

		if (prices[i + 1] > prices[i]) { // handle if trend becomes increasing
			if (decreasing.length) { // since trend is now increasing, compute the previous decreasing trend
				total = doTheMath(decreasing.length)
				if (first) {
					scale.bgnLngt = decreasing.length + 1
					scale.bgnVal = total
					first = false
				}
				count -= total
				decreasing = []
			}
			increasing.push(prices[i])

		} else if (prices[i + 1] < prices[i]) { // handle if trend becomes decreasing
			if (increasing.length) {// since trend is now decreasing, compute the previous increasing trend
				// do the math here
				total = doTheMath(increasing.length)
				if (first) {
					scale.bgnLngt = increasing.length + 1
					scale.bgnVal = total
					first = false
				}
				count += total
				increasing = []
			}
			decreasing.push(prices[i])

		} else if (prices[i + 1] === prices[i]) { // handle if there are identical consecutive numbers
			// like above, compute range based on which trend was the last trend. 
			if (increasing.length) {
				total = doTheMath(increasing.length)
				if (first) {
					scale.bgnLngt = increasing.length + 1
					scale.bgnVal = total
					first = false
				}
				count += total
				increasing = []
			} else if (decreasing.length) {
				total = doTheMath(decreasing.length)
				if (first) {
					scale.bgnLngt = decreasing.length + 1
					scale.bgnVal = total
					first = false
				}
				count -= total
				decreasing = []
			}
		}

		if (i === wind - 1) { // handle the last window of the input array of prices. Same methods as above.
			if (prices[i] > prices[i - 1]) {
				increasing.push(prices[i])
				total = doTheMath(increasing.length - 1)
				scale.endLngt = increasing.length
				scale.endVal = total
				scale.endNum = prices[i]
				// console.log('ending length INCREASING', decreasing.length - 1, total)
				count += total

			} else if (prices[i] < prices[i - 1]) {
				decreasing.push(prices[i])
				total = doTheMath(decreasing.length - 1)
				scale.endLngt = decreasing.length
				scale.endVal = total
				scale.endNum = prices[i]
				// console.log('ending length DECREASING', decreasing.length - 1, total)
				count -= total

			}
		}
	}
	scale.curVal = count
	console.log('scale', scale)
	console.log('changed', )
	return count
}

function doTheMath(start) {
	// using math instead of nested for loops,
	// compute the total amount of subsets using 
	// the sum of natural numbers up to 'start'.
	return (start * start + start) / 2
}

