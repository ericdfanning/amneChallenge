var fs = require('fs');
 
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

function solve(n, wind, price) {
  var converted = helper(n, price)
  var arr = []
  var solution = ''
  for (let i = 0; i < n; i++) {
    if (arr.length < wind - 1) {
      arr.push(converted[i])
    } else {
      let countPos = 0
      let countNeg = 0
      let total = 0

      for (let i = 0; i < arr.length; i++) {

        if (arr[i] > 0) {
          countPos++
          if (countNeg > 0) {
            total += -((countNeg * countNeg + countNeg) / 2)
            countNeg = 0
          } 
        } else if (arr[i] < 0 ) {
          countNeg++
          if (countPos > 0) {
            total += (countPos * countPos + countPos) / 2
            countPos = 0
          } 
        }
      }
      if (countPos) {
        total += (countPos * countPos + countPos) / 2
        solution += total + '\n'
      } else if (countNeg) {
        total += -((countNeg * countNeg + countNeg) / 2)
        solution += total + '\n'
      } else {
        solution += total + '\n'
      }

      arr.shift()
      arr.push(converted[i])
    }
  }
  // console.log(solution)
  fs.writeFile('output', solution, function (err) {
    if (err) throw err;
  });

}

function helper(n, prices) {
    let converted = []

    for (let i = 0; i < n ; i++) {

      prices[i] = Number(prices[i])
      prices[i + 1] = Number(prices[i + 1])

      if (i === n - 1) { 
        return converted
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