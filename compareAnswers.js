var fs = require('fs');

let answerOne = ''
fs.readFile('output', 'utf8', function(err, contents) {
  answerOne = contents
});
let answerTwo = ''
fs.readFile('output2', 'utf8', function(err, contents) {
  answerTwo = contents
  console.log('Is solution accurate?', answerOne === answerTwo)
});

