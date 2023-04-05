# MLJavaScript

All popular Machine Learning algorithms are made available in this repository.

## Prerequisites

Node.js, matrix_deep_clone, jsnumpy.

## Installing

$ npm install jsmachinelearning

## Algorithms.

### Multiple Linear Regression.

```javascript
> var MLAlgorithms = require('jsmachinelearning');

> var model = new MLAlgorithms.MultipleLinearRegression();

> x = [
  [1, 2],
  [4, 2],
  [6, 3],
  [2, 3],
  [5, 1]
]
> y=[1,2,3,2,5];

> model.fit(x,y);

> var k = model.predict([ [1, 2], [4, 2] ])

> console.log(k);
  [ 0.2285865948088468, 1.8311543879819048 ]
```

**NOTE** : `MultipleLinearRegression` function provides a model using which we can train on data with more then one feature vector. In the above example we are having two feature vector in X. It can also be used to predict the value for the unknown data.

### Simple Linear Regression
```javascript
> var model = new MLAlgorithms.SimpleLinearRegression();

> x = [2,3,4,5,6];

> y = [1,2,3,2,5];

> model.fit(x,y)

> k = model.predict([2,4,5]);

> console.log(k);
  [ 1, 2.6, 3.4 ];
```

**NOTE** : `SimpleLinearRegression` provides a model for training on data with single feature vector. It can also predict value for unknown sample.

## Additional Methods

### Train test split

```javascript
> var data = [
  [1, 43, 2],
  [3, 32, 4],
  [5, 13, 6],
  [7, 44, 8]
]

> var [train, test] = mlAlgorithms.train_test_split(data, train_ratio = 0.5);

> console.log(train);
[
  [1, 43, 2],
  [3, 32, 4]
]

> console.log(test);
[
  [7, 44, 8],
  [5, 13, 6]
]
```

**NOTE**: `train_test_split` function divides the data in the train_ratio mentioned. The default value for train_ratio is 0.75 i.e. 75 percent of the data becomes training and 25 percent data becomes test data. The data is not selected in sequential order but instead it is randomized so that proper predication can be made based on the data.

### Separate feature and target data

```javascript
> var data = [
  [1, 43, 2],
  [3, 32, 4],
  [5, 13, 6],
  [7, 44, 8]
]

> var [x, y] = mlAlgorithms.get_X_And_Y(data);

> console.log(x);
[
  [1, 43],
  [3, 32],
  [5, 13],
  [7, 44]
]

> console.log(y);
[2, 4, 6, 8]
```

__NOTE__ : `get_X_And_Y` function returns feature vector and target variable Separated. The function assumes the last column of the data has target variable and first n-1 column has feature vector.


## Authors

- **Nikhil Ashodariya** -(<https://github.com/NikhilAshodariya>)

## License

This project is licensed under the [MIT License](LICENSE)
