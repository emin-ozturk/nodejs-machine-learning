var mulRegression = require('./multivariateRegression');
var regressor = require('./regression');
var MLOperations = require("./MLOperations.js");

var MLAlgorithms = function() {

  return {
    SimpleLinearRegression: regressor.SimpleLinearRegression,
    MultipleLinearRegression: mulRegression.MultipleLinearRegression,
    train_test_split: MLOperations.train_test_split,
    get_X_And_Y: MLOperations.get_X_And_Y
  }
}

module.exports = MLAlgorithms();
