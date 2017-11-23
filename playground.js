var fs = require('fs');

const a = 'amneExampleInput'
const b = 'input2'
const c = 'maxInput'

var file = b

var solution = ''

fs.readFile(file, 'utf8', function(err, contents) {
  let firstLine = contents.split('\n')[0]
  let n = firstLine.split(' ')[0]
  let windoh = firstLine.split(' ')[1]
  let prices = contents.split('\n')[1].split(' ')
  solve(Number(n), Number(windoh), prices)

});

function solve(n, wind, prices) {
  let converted = helper(wind, prices)
  let startingObject = makeFirstObject(wind, prices.slice(0, wind))
  let revamp = startingObject
  let ranges = converted.ranges
  let count = 1
  solution += revamp.sum + '\n'
console.log('beginning solution', startingObject)
// 7 13 47 12 23 89 4 56 113
  for (let i = wind; i < prices.length; i++) {
  	console.log('starting object\n', i, prices.length, revamp)
  	let newObj = {}
  	if (revamp.begConvrtVal > 0) {
  		revamp.begnLength -= 1
  	  newObj.begnLength = revamp.begnLength
  	  newObj.sum = revamp.sum - revamp.begConvrtVal
  	} else {
  		revamp.begnLength -= 1
  		newObj.begnLength = revamp.begnLength
  		newObj.sum = revamp.sum - revamp.begConvrtVal
  	}

  	if (revamp.begnLength >= 2) {
  		console.log('BEGINNING LENGTH IS 2 or GREATER.', 'length:', newObj.begnLength, newObj.sum)
  		newObj.begConvrtVal = doTheMath(newObj.begnLength - 1)

  		if (revamp.begConvrtVal > 0) {
  		  newObj.sum += newObj.begConvrtVal
  		  newObj.begConvrtVal = doTheMath(newObj.begnLength - 1)
  		} else {
  			newObj.sum -= newObj.begConvrtVal
  			newObj.begConvrtVal = -doTheMath(newObj.begnLength - 1)
  		}

  		if (ranges.length === 1) {
  			count++
  		}

  	} else if (revamp.begnLength === 1 && count < ranges.length) {
  		console.log('INSIDE index', count)

  		newObj.begnLength = ranges[count].length
  		console.log('INSIDE RANGE & LENGTH', newObj.begnLength, ranges[count])

  		let nexRng = ranges[count]
  		console.log('lkajsd;lkl;kajsdl;fkas    ---', nexRng[1], nexRng[0], nexRng)
  		if (nexRng[1] < nexRng[0]) { // check if incoming number is < || >
  			newObj.begConvrtVal = -doTheMath(newObj.begnLength - 1)
  			console.log('*********  less than ', newObj.begConvrtVal)
  		} else if (nexRng[1] > nexRng[0]) {
  			newObj.begConvrtVal = doTheMath(newObj.begnLength - 1)
  			console.log('*********  greater than ', newObj.begConvrtVal)
  		} else {
  			newObj.begConvrtVal = revamp.begConvrtVal
  			console.log('*********  equal ', newObj.begConvrtVal)
  		}

  		if (count < ranges.length - 1) {
  			count++
  		}

  	} else {
  		console.log('IN THE LAND OF NOWHERE!!!!!!!!!!!')
  		count++
  	}
  	// if (revamp.begConvrtVal === 1 || revamp.begConvrtVal ===  -1) {
  	// 	console.log('BEFORE ASSIGNING TO SUM size one', revamp.sum, revamp.begConvrtVal, newObj.begConvrtVal)
  	// 	newObj.sum = revamp.sum - revamp.begConvrtVal
  		
  	// } else {
  	// 	console.log('BEFORE ASSIGNING TO SUM', revamp.sum, revamp.begConvrtVal, newObj.begConvrtVal)
  	// 	newObj.sum = revamp.sum - revamp.begConvrtVal + newObj.begConvrtVal
  		
  	// }

  	console.log('REVAMP', Number(prices[i]), 'index', i, revamp, 'NEW SUM', newObj.sum, 'end length', revamp.endLength)
  	if (prices[i] < revamp.endNumber && revamp.endConvrtVal > 0) { // check if incoming number is < || >
  		newObj.endLength = 2
  		newObj.endConvrtVal = -doTheMath(newObj.endLength - 1)
  		// console.log('one sum', newObj.sum)
  		newObj.sum += newObj.endConvrtVal 

  		console.log('ONE', newObj.sum)
  	} else if (Number(prices[i]) < revamp.endNumber && revamp.endConvrtVal < 0) {
	  		if (ranges.length > 1) {
		  		newObj.endLength = revamp.endLength + 1
		  		newObj.endConvrtVal = -doTheMath(newObj.endLength - 1)
		  		newObj.sum += revamp.endConvrtVal * -1
		  		newObj.sum += newObj.endConvrtVal 
		  	} else {
		  		if (count <= wind) {
		  			console.log('ADDED BEGN BACK ON inside two')
		  			newObj.begnLength += 1
		  			newObj.begConvrtVal = revamp.begConvrtVal
		  			newObj.endLength = revamp.endLength
		  			newObj.sum = revamp.endConvrtVal 
		  			newObj.endConvrtVal = revamp.endConvrtVal
		  		} else {
			  		console.log('ranges less than one ###')
						newObj.endLength = revamp.endLength + 1
						newObj.endConvrtVal = -doTheMath(newObj.endLength - 1)
						newObj.sum += revamp.endConvrtVal * -1
						newObj.sum += newObj.endConvrtVal 
					}
		  	}

		  	if (newObj.endLength === wind) {
		  		newObj.begnLength = wind
		  		newObj.begConvrtVal = newObj.endConvrtVal
		  	}
  		console.log('TWO', newObj.sum)

  	} else if (Number(prices[i]) > revamp.endNumber && revamp.endConvrtVal < 0) {

  		newObj.endLength = 2
  		newObj.endConvrtVal = doTheMath(newObj.endLength - 1)
  		newObj.sum += newObj.endConvrtVal 

  		console.log('THREE', newObj.sum)

  	} else if (Number(prices[i]) > revamp.endNumber && revamp.endConvrtVal > 0) {
  		console.log('length ....... ', revamp.endLength, ranges.length)
  		if (ranges.length > 1) {
  			newObj.endLength = revamp.endLength + 1
  			console.log('new length', newObj.endLength)
  			newObj.endConvrtVal = doTheMath(newObj.endLength - 1)
				console.log('new converted', newObj.endConvrtVal)
  			newObj.sum += newObj.endConvrtVal - revamp.endConvrtVal
  		} else {
  			if (count <= wind) {
  				newObj.begnLength += 1
  				newObj.begConvrtVal = revamp.begConvrtVal
  				console.log('ADDED BEGN BACK ON inside four', count, wind - 1)
					newObj.endLength = revamp.endLength
					newObj.sum = revamp.endConvrtVal 
					newObj.endConvrtVal = revamp.endConvrtVal
  			} else {
	  			newObj.endLength = revamp.endLength + 1
	  			console.log('new length after', newObj.endLength)
	  			newObj.endConvrtVal = doTheMath(newObj.endLength - 1)
					console.log('new converted after', newObj.endConvrtVal)
	  			newObj.sum += newObj.endConvrtVal - revamp.endConvrtVal
  			}
  			console.log('ranges less than one ###')

  		}

  		if (newObj.endLength === wind) {
  			newObj.begnLength = wind
  			newObj.begConvrtVal = newObj.endConvrtVal
  		}

  		console.log('FOUR', newObj.sum, newObj.endConvrtVal, newObj.endLength)

  	} else if (Number(prices[i]) === revamp.endNumber) {
  		newObj.endLength = revamp.endLength = 0
  		newObj.endConvrtVal = revamp.endConvrtVal

  		console.log('ZERO', newObj.sum)
  	}
  	newObj.endNumber = Number(prices[i])
  	solution += newObj.sum + '\n'
  	revamp = Object.assign({}, newObj)
  	console.log('ITERATION', newObj)

  }
  console.log('FINAL OUTPUT', solution)
  fs.writeFile('output', solution, function (err) {
    if (err) throw err;
  });

}

function helper(wind, prices) {
  let count = 0
  let increasing = []
  let decreasing = []
  let total = 0
  let revamp = {}
  let ranges = []
  //***** try changing the increasing and decreasing arrays into integers since I only need the length

  for (let i = 0; i < prices.length ; i++) {

    if (Number(prices[i + 1]) > Number(prices[i])) { 
      if (decreasing.length) { 
        // total = -doTheMath(decreasing.length)
        if (i < wind) {
          total += -doTheMath(decreasing.length)

          count += total
        }
        // count -= total
        decreasing.push(Number(prices[i]))
        ranges.push(decreasing)
        if (!revamp.begnLength) {
          revamp.begConvrtVal = total
          revamp.begnLength = decreasing.length
        }

        decreasing = []
      }


      if (i === wind - 1) {
        // console.log('finished', decreasing.length, increasing.length)
        if (increasing.length) {
          total += doTheMath(increasing.length)
        } else if (decreasing.length) {
          total += -doTheMath(decreasing.length)
        }
        // console.log('finished', total)
        if (!revamp.begnLength) {

          revamp.begConvrtVal = total
          revamp.begnLength = decreasing.length
        }
        revamp.endConvrtVal = total
        revamp.endLength = decreasing.length
        revamp.endNumber = Number(prices[i])
        increasing = []
      }
      increasing.push(Number(prices[i]))

    } else if (Number(prices[i + 1]) < Number(prices[i])) { 
      if (increasing.length) {
        // total = doTheMath(increasing.length)
        if (i < wind) {
          total += doTheMath(increasing.length)
          count += total
        }
        // count += total
        increasing.push(Number(prices[i]))
        ranges.push(increasing)
        if (!revamp.begnLength) {
          revamp.begConvrtVal = total
          revamp.begnLength = increasing.length
        }


        increasing = []
      }


      if (i === wind - 1) {
        if (increasing.length) {
          total += doTheMath(increasing.length)
        } else if (decreasing.length) {
          total += -doTheMath(decreasing.length)
        }
        if (!revamp.begnLength) {
          revamp.begConvrtVal = total
          revamp.begnLength = increasing.length
        }
        revamp.endConvrtVal = total
        revamp.endLength = increasing.length
        revamp.endNumber = Number(prices[i])
        decreasing = []
      }
      decreasing.push(Number(prices[i]))

    } else if (Number(prices[i + 1]) === Number(prices[i])) {

      if (increasing.length) {
        if (i < wind) {
          total = doTheMath(increasing.length)
          count += total
        }
        // count += total
        increasing.push(Number(prices[i]))
        ranges.push(increasing)
        if (!revamp.begnLength) {
          revamp.begConvrtVal = total
          revamp.begnLength = increasing.length
        } 

        if (i === wind - 1) {
          if (increasing.length) {
            total += doTheMath(increasing.length)
          } else if (decreasing.length) {
            total += -doTheMath(decreasing.length)
          }
          if (!revamp.begnLength) {

            revamp.begConvrtVal = total
            revamp.begnLength = decreasing.length
          }
          revamp.endConvrtVal = total
          revamp.endLength = decreasing.length
          revamp.endNumber = Number(prices[i])
          increasing = []
        }
        increasing.push(Number(prices[i]))
        increasing = []
      } else if (decreasing.length) {
        if (i < wind) {
          total = -doTheMath(decreasing.length)
          count += total
        }
        // count -= total
        ranges.push(decreasing)
        if (!revamp.begnLength) {
          revamp.begConvrtVal = total
          revamp.begnLength = decreasing.length
        }

        if (i === wind - 1) {
          if (increasing.length) {
            total += doTheMath(increasing.length)
          } else if (decreasing.length) {
            total += -doTheMath(decreasing.length)
          }
          if (!revamp.begnLength) {
            revamp.begConvrtVal = total
            revamp.begnLength = increasing.length
          }
          revamp.endConvrtVal = total
          revamp.endLength = increasing.length
          revamp.endNumber = Number(prices[i])
          decreasing = []
        }
        decreasing.push(Number(prices[i]))
        decreasing = []
      }
    }

    if (i === prices.length - 1) { 
      if (Number(prices[i]) > prices[i - 1]) {
        increasing.push(Number(prices[i]))
        // total = doTheMath(increasing.length - 1)
        if (i < wind) {
          count += total
        }
        // if (i === wind - 1) {
        //   total += doTheMath(increasing.length)
        // }
        // count += total
        
        // if (!revamp.begnLength) {
        //   revamp.begConvrtVal = total
        //   revamp.begnLength = increasing.length
        // }
        ranges.push(increasing)
        // revamp.endConvrtVal = total
        // revamp.endLength = increasing.length
        // revamp.endNumber = Number(prices[i])

      } else if (Number(prices[i]) < prices[i - 1]) {
        decreasing.push(Number(prices[i]))
        // total = doTheMath(decreasing.length - 1)
        if (i < wind) {
          count += total
        }
        // count -= total
        
        // if (!revamp.begnLength) {

        //   revamp.begConvrtVal = total
        //   revamp.begnLength = decreasing.length
        // }
        ranges.push(decreasing)
        // revamp.endConvrtVal = total
        // revamp.endLength = decreasing.length
        // revamp.endNumber = Number(prices[i])
      }
    }
  }

  revamp.sum = total
  return { revamp, ranges }
}

function makeFirstObject(wind, prices) {
  let count = 0
  let increasing = []
  let decreasing = []
  let total;
  let revamp = {}


  //***** try changing the increasing and decreasing arrays into integers since I only need the length

  for (let i = 0; i < prices.length ; i++) {

    prices[i] = Number(prices[i])

    if (Number(prices[i + 1]) > prices[i]) { 
      if (decreasing.length) { 
        total = doTheMath(decreasing.length)
        count -= total
        decreasing.push(prices[i])

        if (!revamp.begnLength) {
          revamp.begConvrtVal = total
          revamp.begnLength = decreasing.length
        }

        decreasing = []
      }
      increasing.push(prices[i])

    } else if (Number(prices[i + 1]) < prices[i]) { 
      if (increasing.length) {

        total = doTheMath(increasing.length)
        count += total
        increasing.push(prices[i])

        if (!revamp.begnLength) {
          revamp.begConvrtVal = total
          revamp.begnLength = increasing.length
        }

        increasing = []
      }
      decreasing.push(prices[i])

    } else if (Number(prices[i + 1]) === prices[i]) {

      if (increasing.length) {
        total = doTheMath(increasing.length)
        count += total
        increasing.push(prices[i])

        if (!revamp.begnLength) {
          revamp.begConvrtVal = total
          revamp.begnLength = increasing.length
        } 
        increasing.push(prices[i])
        increasing = []
      } else if (decreasing.length) {
        total = doTheMath(decreasing.length)
        count -= total
        decreasing.push(prices[i])

        if (!revamp.begnLength) {

          revamp.begConvrtVal = total
          revamp.begnLength = decreasing.length
        }
        decreasing.push(prices[i])
        decreasing = []
      }
    }

    if (i === wind - 1) { 
      console.log('lkajsd', i, prices[i])
      if (prices[i] > prices[i - 1]) {
        increasing.push(prices[i])
        total = doTheMath(increasing.length - 1)
        count += total
        
        if (!revamp.begnLength) {

          revamp.begConvrtVal = total
          revamp.begnLength = increasing.length
        }

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

        revamp.endConvrtVal = -total
        revamp.endLength = decreasing.length
        revamp.endNumber = prices[i]
      }
    }
  }

  revamp.sum = count
  return revamp
}

function doTheMath(start) {

	return (start * start + start) / 2
}