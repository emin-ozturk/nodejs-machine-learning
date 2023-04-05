var mlAlgorithms = require('./MLAlgorithms.js');


var data = [
  [1, 43, 2],
  [3, 32, 4],
  [5, 13, 6],
  [7, 44, 8]
]
var [x, y] = mlAlgorithms.get_X_And_Y(data);

console.log(x);
console.log(y);
