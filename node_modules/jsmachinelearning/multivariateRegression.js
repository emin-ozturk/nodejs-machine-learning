var nj = require('jsnumpy');
var mlOperations = require('./MLOperations.js');

var MultipleLinearRegression =
  function() {
    function predict(to_predict) {
      var ans = [];
      for (k in to_predict) {
        ans[k] = (this.beta[0] + nj.sum(nj.multiply(this.beta.slice(1), to_predict[k])));
      }
      return ans;
    }

    function fit(x, y, verbose = false) {
      this.x = x;
      this.y = y;
      this.y_predicted = [];

      this.gradientDescent(verbose);

    }

    function preProcessArray(data) {
      // console.log(data);
      for (var i = 0; i < data[0].length; i++) {
        temp = mlOperations.get_Separate_columns(data, i);
        // console.log(temp);
        var t = nj.subtract(temp, nj.mean(temp));
        // console.log(`t = ${t}`);
        roundData(t);
        mlOperations.set_Column(data, t, i);
      }
    }

    function roundData(data, precision = 4) {
      for (var i in data) {
        data[i] = Number((data[i]).toFixed(precision));
      }
    }

    function insertFirstRow(data) {
      for (var i in data) {
        data[i].unshift(1);
      }
    }

    function gradientDescent(verbose = false) {
      // preProcessArray(this.x);
      insertFirstRow(this.x);
      this.createBetas();
      // console.log(this.x);
      this.calculateYHat();
      // console.log(this.y_predicted);
      this.numberOfIteration = 0;
      while (this.isConverage() == false) {
        if (verbose == true) {
          console.log("Regression running");
        }
        // for (var i in this.beta) {
        //calculateYHat
        //subtract Yhat from original y
        //multiply the result with x[0]
        //take sum of the result of the above ans
        //divide it with length of m
        //multiply with alpha
        //subtract beta from the answer and again store in beta;
        // console.log(`THis beta is ${this.beta}`);
        // console.log(`beta of 0 is ${this.beta[0]}`);
        // console.log(`beta of 0 is ${this.beta[1]}`);
        // console.log(`beta of 0 is ${this.beta[2]}`);
        // console.log(`beta of 0 is ${this.beta[3]}`);
        // console.log(`type of beta is ${this.beta.length}`);
        // break;
        for (var j = 0; j < this.beta.length; j++) {
          this.calculateYHat();
          // console.log(`Yhat is ${this.y_predicted}`);
          // console.log(`y   =   ${this.y}`);
          // console.log(`length of yhat is ${this.y_predicted.length}`);
          // console.log(`length of y is ${this.y.length}`);
          var temp = nj.subtract(this.y_predicted, this.y);
          // console.log(`yhat-y  ${temp}`);
          var x_temp = mlOperations.get_Separate_columns(this.x, j);
          // console.log(`X_temp is = ${x_temp}`);
          var t = nj.multiply(x_temp, temp);
          // console.log(`Element multiply is ${t}`);
          var k = nj.sum(t);
          // console.log(`sum is ${k}`);
          this.beta[j] = this.beta[j] - this.learning_rate * (k / this.y.length);
          // console.log(`Betas of ${j} = ${this.beta[j]}`);
        }
        // break;
        // }


        this.numberOfIteration++;
      }
    }

    function createBetas() {
      this.beta = [];
      // this.beta[0] = 0; // This is added which is equivalent of thetaZero
      // console.log(this.x[0]);
      for (i in this.x[0]) {
        // var t = Number(i);
        // console.log(t);
        this.beta[i] = 0;
      }
    }

    function calculateYHat() {
      for (var i in this.y) {
        // console.log(`in calculateYHat x = ${this.x[i]}`);
        // console.log(`in calculateYHat beta = ${this.beta}`);
        var outer_temp = nj.multiply(this.beta, this.x[i]);
        // console.log("in calculateYHat temp = " + outer_temp);
        var temp = nj.sum(outer_temp);
        this.y_predicted[i] = this.beta[0] + temp;
      }
    }

    function isConverage() {
      error = nj.sum(nj.square(nj.subtract(this.y_predicted, this.y))) / this.y.length;
      error = Number((error).toFixed(this.decimalPlaceError));
      // console.log(error);
      this.errorArray.push(error);
      // console.log(`Error array size = ${this.sizeErrorArray}`);
      // console.log(`Error Array length = ${this.errorArray.length}`);
      if (this.sizeErrorArray < this.errorArray.length) {
        this.errorArray = this.errorArray.slice(this.errorArray.length - this.sizeErrorArray);
      }
      if (this.isAllSame(this.errorArray)) {
        // console.log("returning true");
        return true;
      } else {
        // console.log("returning false");
        return false;
      }

    }

    function isAllSame(data) {
      // console.log(`printing data length = ${data.length}`);
      // console.log(`${this.sizeErrorArray}`);
      if (data.length < this.sizeErrorArray) {
        return false;
      } else {
        for (var i = 1; i < data.length; i++) {
          if (data[i] !== data[0])
            return false;
        }
      }
      return true;
    }

    function MultiplyLinearRegression(learning_rate = 0.01, size_error_array = 5, decimal_place_error = 4) {
      this.errorArray = [];
      this.sizeErrorArray = size_error_array;
      this.decimalPlaceError = decimal_place_error;
      this.learning_rate = learning_rate;
      // this.calculateYHat();
    }
    MultiplyLinearRegression.prototype.fit = fit;
    MultiplyLinearRegression.prototype.gradientDescent = gradientDescent;
    MultiplyLinearRegression.prototype.createBetas = createBetas;
    MultiplyLinearRegression.prototype.calculateYHat = calculateYHat;
    MultiplyLinearRegression.prototype.isConverage = isConverage;
    MultiplyLinearRegression.prototype.isAllSame = isAllSame;
    MultiplyLinearRegression.prototype.predict = predict;

    return {
      MultipleLinearRegression: MultiplyLinearRegression
    }
  }

module.exports = MultipleLinearRegression();
