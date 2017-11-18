var fs = require('fs');

const a = 'amneExampleInput'
const b = 'input2'
const c = 'maxInput'

var file = a

var solution = ''

fs.readFile(file, 'utf8', function(err, contents) {
  let firstLine = contents.split('\n')[0]
  let n = firstLine.split(' ')[0]
  let windoh = firstLine.split(' ')[1]
  let prices = contents.split('\n')[1].split(' ')
  solve(Number(n), Number(windoh), prices)

});

function solve(n, wind, prices) {
  let converted = helper(wind, prices.slice(0, wind))
  let revamp = converted.revamp
  let ranges = converted.ranges
  let count = 1
  solution += revamp.sum
// console.log(converted)

  for (let i = wind; i < prices.length; i ++) {

  	revamp.begnLength -= 1
  	let newObj = {}
  	if (revamp.begnLength > 1) {
  		newObj.begnLength = revamp.begnLength - 1
  	} else if (revamp.begnLength === 1 && i !== prices.length - 1) {
  		console.log('INSIDE', i)
  		let curRng = ranges[count]

  		newObj.begnLength = ranges[count].length

  		if (count < ranges.length - 1) {
  			count++
  		}
  		// console.log('curRng', curRng, ranges[count], count)
  		// console.log('here', prices[i], curRng[curRng.length - 1])
  		let nexRng = ranges[count]
  		if (nexRng[0] < curRng[curRng.length - 1]) { // check if incoming number is < || >
  			newObj.begConvrtVal = -doTheMath(newObj.begnLength - 1)
  		} else if (nexRng[0] > curRng[curRng.length - 1]) {
  			newObj.begConvrtVal = doTheMath(newObj.begnLength - 1)
  		}

  	}

  	newObj.sum = revamp.sum - revamp.begConvrtVal + doTheMath(newObj.begnLength - 1)
  	// console.log(newObj)

  	if (prices[i] < revamp.endNumber && revamp.endConvrtVal > 0) { // check if incoming number is < || >
  		newObj.endLength = 2
  		newObj.endConvrtVal = -doTheMath(newObj.endLength - 1)
  		newObj.sum += newObj.endConvrtVal 
  	} else if (prices[i] < revamp.endNumber && revamp.endConvrtVal < 0) {
  		newObj.endLength = revamp.endLength++
  		newObj.endConvrtVal = -doTheMath(newObj.endLength - 1)
  		newObj.sum += revamp.endConvrtVal * -1
  		newObj.sum += newObj.endConvrtVal 
  	} else if (prices[i] > revamp.endNumber && revamp.endConvrtVal < 0) {
  		newObj.endLength = 2
  		newObj. endConvrtVal = doTheMath(newObj.endLength - 1)
  		newObj.sum += newObj.endConvrtVal 
  	} else if (prices[i] > revamp.endNumber && revamp.endConvrtVal > 0) {
  		newObj.endLength = revamp.endLength++
  		newObj.endConvrtVal = doTheMath(newObj.endLength - 1)
  		newObj.sum += revamp.endConvrtVal * -1
  		newObj.sum += newObj.endConvrtVal 
  	}
  	solution += newObj.sum
  	console.log('solution', newObj)

  }

  fs.writeFile('output', solution, function (err) {
    if (err) throw err;
  });

}

function helper(wind, prices) {
  let count = 0
  let increasing = []
  let decreasing = []
  let total;
  let revamp = {}
  let ranges = []

  //***** try changing the increasing and decreasing arrays into integers since I only need the length

	for (let i = 0; i < wind ; i++) {

		prices[i] = Number(prices[i])
		prices[i + 1] = Number(prices[i + 1])

		if (prices[i + 1] > prices[i]) { 
			if (decreasing.length) { 
				total = doTheMath(decreasing.length)
				count -= total
				decreasing.push(prices[i])
				ranges.push(decreasing)
				if (!revamp.begnLength) {
					revamp.begConvrtVal = total
					revamp.begnLength = decreasing.length
				}

				decreasing = []
			}
			increasing.push(prices[i])

		} else if (prices[i + 1] < prices[i]) { 
			if (increasing.length) {

				total = doTheMath(increasing.length)
				count += total
				increasing.push(prices[i])
				ranges.push(increasing)
				if (!revamp.begnLength) {
					revamp.begConvrtVal = total
					revamp.begnLength = increasing.length
				}

				increasing = []
			}
			decreasing.push(prices[i])

		} else if (prices[i + 1] === prices[i]) {

			if (increasing.length) {
				total = doTheMath(increasing.length)
				count += total
				increasing.push(prices[i])
				ranges.push(increasing)
				if (!revamp.begnLength) {
					revamp.begConvrtVal = total
					revamp.begnLength = increasing.length
				} 

				increasing = []
			} else if (decreasing.length) {
				total = doTheMath(decreasing.length)
				count -= total
				decreasing.push(prices[i])
				ranges.push(decreasing)
				if (!revamp.begnLength) {

					revamp.begConvrtVal = total
					revamp.begnLength = decreasing.length
				}

				decreasing = []
			}
		}

		if (i === wind - 1) { 
			if (prices[i] > prices[i - 1]) {
				increasing.push(prices[i])
				total = doTheMath(increasing.length - 1)
				count += total
				
				if (!revamp.begnLength) {

					revamp.begConvrtVal = total
					revamp.begnLength = increasing.length
				}
				ranges.push(increasing)
				revamp.endConvrtVal = total
				revamp.endLength = increasing.length
				revamp.endNumber = prices[i]

			} else if (prices[i] < prices[i - 1]) {
				decreasing.push(prices[i])
				total = doTheMath(decreasing.length - 1)
				count -= total
				
				if (!revamp.begnLength) {

					revamp.begConvrtVal = total
					revamp.begnLength = decreasing.length
				}
				ranges.push(decreasing)
				revamp.endConvrtVal = total
				revamp.endLength = decreasing.length
				revamp.endNumber = prices[i]
			}
		}
	}

	revamp.sum = count
	return { revamp, ranges }
}

function doTheMath(start) {

	return (start * start + start) / 2
}