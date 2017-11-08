var fs = require('fs');

// ******* IF USED IRL, MEMOIZE THE FUNCTION TO IMPROVE SPEED BY CREATING CONSTANT TIME LOOKUP *******
 
// change name of file to test different input
const a = 'amneExampleInput'
const b = 'input2'
const c = 'maxInput'

var file = c

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

// 7 13 47 12 23 89 4 56 13 4 4 87 71 22

	var solution = ''
function solve(n, wind, prices) {
	// solution += helper(0, wind, prices.slice(0, 0 + wind))
	// addOthers(prices[wind], scale.bgnLngt, scale.bgnVal)
	// iterate over the prices array up until a full window can not be completed
  	helper(n, wind, prices)
  	// if (i !== prices.length - wind) { // if on the last value, disregard the new line for formats sake
  	// 	solution += '\n'
  	// }
  // }

  // if (n%wind !== 0) {
  // 	// console.log('left over ', prices.slice(-wind))
  // 	solution += '\n'
  // 	solution += helper(wind, prices.slice(-wind))
  // }
  // write the answers to output file

  // console.log('cache', cache)

  fs.writeFile('output', solution, 'utf-8', function(err, data) {
    if (err) throw err;
  })
}

let cache = []

function helper(n, wind, prices) {
  let count = 0
  let increasing = []
  let decreasing = []
  let total;


	var first = true
	for (let i = 0; i < n ; i++) {

		prices[i] = Number(prices[i])
		prices[i + 1] = Number(prices[i + 1])

		if (prices[i + 1] > prices[i]) { // handle if trend becomes increasing
			// if (decreasing.length) { // since trend is now increasing, compute the previous decreasing trend
			// 	// total = doTheMath(decreasing.length)
			// 	decreasing.push(prices[i])
			// 	if (first) {
			// 		scale.bgnLngt = decreasing.length + 1
			// 		scale.bgnVal = total
			// 		first = false
			// 	}
			// 	count -= total
			// 	decreasing = []
			// }
			// increasing.push(prices[i])
			cache.push(1)
		} else if (prices[i + 1] < prices[i]) { // handle if trend becomes decreasing
			// if (increasing.length) {// since trend is now decreasing, compute the previous increasing trend
			// 	// do the math here
			// 	// total = doTheMath(increasing.length)
			// 	increasing.push(prices[i])
			// 	if (first) {
			// 		scale.bgnLngt = increasing.length + 1
			// 		scale.bgnVal = total
			// 		first = false
			// 	}
			// 	count += total
			// 	increasing = []
			// }
			// decreasing.push(prices[i])
			cache.push(-1)
		} else if (prices[i + 1] === prices[i]) { // handle if there are identical consecutive numbers
			// like above, compute range based on which trend was the last trend. 
			// if (increasing.length) {
			// 	// total = doTheMath(increasing.length)
			// 	increasing.push(prices[i])
			// 	if (first) {
			// 		scale.bgnLngt = increasing.length + 1
			// 		scale.bgnVal = total
			// 		first = false
			// 	}
			// 	count += total
			// 	increasing = []
			// } else if (decreasing.length) {
			// 	// total = doTheMath(decreasing.length)
			// 	decreasing.push(prices[i])
			// 	if (first) {
			// 		scale.bgnLngt = decreasing.length + 1
			// 		scale.bgnVal = total
			// 		first = false
			// 	}
			// 	count -= total
			// 	decreasing = []
			// }
			cache.push(0)
		}

		if (i === n - 1) { // handle the last window of the input array of prices. Same methods as above.
			if (prices[i] > prices[i - 1]) {
				// increasing.push(prices[i])
				// // total = doTheMath(increasing.length - 1)
				// scale.endLngt = increasing.length
				// scale.endVal = total
				// scale.endNum = prices[i]
				// // console.log('ending length INCREASING', decreasing.length - 1, total)
				// count += total
				cache.push(1)
			} else if (prices[i] < prices[i - 1]) {
				// decreasing.push(prices[i])
				// // total = doTheMath(decreasing.length - 1)
				// scale.endLngt = decreasing.length
				// scale.endVal = total
				// scale.endNum = prices[i]
				// // console.log('ending length DECREASING', decreasing.length - 1, total)
				// count -= total
				cache.push(-1)
			}
		}
		// console.log('outside')
		if (cache.length === (wind - 1)) {
			// console.log('inside')
			let count = 0
			for (let i = 0; i < cache.length; i++) {
				count += cache[i]
			}
			// console.log('passed to math func', Math.abs(count))
			if (count < 0) {
			  solution += -doTheMath(Math.abs(count))
			  if (i !== n - 1) { // if on the last value, disregard the new line for formats sake
  		    solution += '\n'
  	    }
		  } else {
		  	solution += doTheMath(Math.abs(count))
			  if (i !== n - 1) { // if on the last value, disregard the new line for formats sake
  		    solution += '\n'
  	    }
		  }
		}
	}
	scale.curVal = count
	// console.log('scale', scale)
	return count
}

// 5 3
// 188930 194123 201345 154243 154243

function doTheMath(start) {
	// using math instead of nested for loops,
	// compute the total amount of subsets using 
	// the sum of natural numbers up to 'start'.
 	cache.shift()

	return (start * start + start) / 2
}

