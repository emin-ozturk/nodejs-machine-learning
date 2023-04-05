var nj = require('jsnumpy');
// y = b0 + b1x1;
// b0 = ymean - b1*xmean;
// b1 = (sum((xi-xmean)*(yi-ymean)))/(sum(xi-xmean)^2)

var regressor = (
  function() {
    function fit(x, y) {
      this.x = x;
      this.y = y;
      xmean = nj.mean(x);
      ymean = nj.mean(y);
      var x_minus_xmean = nj.subtract(x, xmean);
      var y_minus_ymean = nj.subtract(y, ymean);
      upper = nj.sum(nj.multiply(x_minus_xmean, y_minus_ymean));
      var x_minus_xmean_square = nj.square(x_minus_xmean);
      lower = nj.sum(x_minus_xmean_square);
      var b_one = upper / lower;
      var b_zero = ymean - b_one * xmean;
      var res = [];
      res[0] = b_zero;
      res[1] = b_one;
      this.b_zero = b_zero;
      this.b_one = b_one;
      // return res;
    }

    function predict(x) {
      var y_predicted = [];
      for (i in x) {
        y_predicted[i] = this.b_zero + this.b_one * x[i];
      }
      return y_predicted;
    }

    function Regression() {
      this.x = [];
      this.y = [];
    }

    Regression.prototype.fit = fit;
    Regression.prototype.predict = predict;

    return {
      SimpleLinearRegression: Regression,
    }
  }
);

module.exports = regressor();
