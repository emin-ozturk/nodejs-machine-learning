var MLOperation = function() {

  function generateRandomNumbers(totalNumbers, min = 0, max = totalNumbers + min) {
    /**
     * Both the min and max values are included.
     */
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    var arr = [];
    var counter = -1;
    while (arr.length < totalNumbers) {
      var randomnumber = getRandomInt(min, max);
      if (arr.indexOf(randomnumber) > -1) {
        continue;
      }
      counter++;
      arr[counter] = randomnumber;
    }
    return arr;
  }

  function train_test_split(data, train_ratio = 0.75) {
    if (data == undefined) {
      throw new Error("Dataset if not passed in train_test_split");
    } else {
      var train_data_size = train_ratio * data.length;
      var test_data_size = (1 - train_ratio) * data.length;
      var train_data_index = generateRandomNumbers(train_data_size, min = 0, max = data.length - 1);
      var test_data_index = [];
      var counter = -1;
      for (var j = 0; j < data.length; j++) {
        if (!train_data_index.includes(j)) {
          test_data_index[++counter] = j;
        }
      }
      var train_data = [];
      var test_data = [];
      var counter = -1;
      for (i of train_data_index) {
        train_data[++counter] = data[i];
      }
      counter = -1;
      for (j of test_data_index) {
        test_data[++counter] = data[j];
      }
      return [train_data, test_data];
    }
  }

  function get_X_And_Y(data) {
    var x = [];
    var y = [];

    for (var i in data) {
      if (data[i].length == 2) {
        /**
         * This means that only one value of x is present
         */
        if (data[i][0] != undefined) {
          x[i] = data[i][0];
        }
        if (data[i][1] != undefined) {
          y[i] = data[i][1];
        }
      } else {
        if (data[i][0] != undefined) {
          x[i] = data[i].slice(0, data[i].length - 1);
          y[i] = data[i][data[i].length - 1];
        }
      }
    }
    var ans = [];
    ans[0] = x;
    ans[1] = y;
    return ans;
  }

  function get_Separate_columns(data, index = 0) {
    if (data[0].length <= index) {
      throw new Error("Index out of bond");
    }
    var ans = [];
    for (var i in data) {
      ans[i] = data[i][index];
    }
    return ans;
  }

  function set_Column(data, to_set, index) {
    if (data[0].length <= index) {
      throw new Error("Index out of bond");
    }
    for (var j in data) {
      data[j][index] = to_set[j];
    }
  }

  function get_Dimensions(data) {
    /*checking for single error since it causes problem*/
    if (typeof(data[0]) == 'number' && typeof(data) == 'object') {
      var res = []
      res[0] = 1;
      res[1] = data.length;
      return res;
    }

    function get_Dim(data, dim, i = 0) {
      if (typeof(data) == "object") {
        dim[i] = data.length;
        get_Dim(data[0], dim, ++i);
      } else if (typeof(data) == "number") {
        return 1;
      } else {
        return undefined;
      }
    }
    var dimen = [];
    get_Dim(data, dimen);
    return dimen;
  }

  function isSingleArray(data) {
    if (get_Dimensions(data).length == 2 && get_Dimensions(data)[0] == 1) {
      return true;
    }
    return false;
  }

  function hasSingleItem(data) {
    if (data.length == 1) {
      return true;
    } else {
      return false;
    }
  }

  function check_all_dimensions_same(firstArray, secondArray) {
    var firstSize = get_Dimensions(firstArray);
    var secondSize = get_Dimensions(secondArray);
    if (firstSize.length != secondSize.length) {
      return false;
    } else {
      for (var i = 0; i < firstArray.length; i++) {
        if (firstSize[i] != secondSize[i]) {
          return false;
        }
      }
      return true;
    }
  }

  function is_first_greater(first_array, second_array) {
    first_array_dimension = get_Dimensions(first_array);
    second_array_dimension = get_Dimensions(second_array);
    if (first_array_dimension.length > second_array_dimension.length) {
      return true;
    } else if (first_array_dimension.length == second_array_dimension.length) {
      for (j in first_array_dimension) {
        if (second_array_dimension[j] < first_array_dimension[j]) {
          return true;
        } else if (second_array_dimension[j] > first_array_dimension[j]) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  return {
    train_test_split: train_test_split,
    get_X_And_Y: get_X_And_Y,
    get_Separate_columns: get_Separate_columns,
    set_Column: set_Column,
    are_dimensions_same: check_all_dimensions_same,
    is_first_greater: is_first_greater,
    isSingleArray: isSingleArray,
    hasSingleItem: hasSingleItem
  }

}

module.exports = MLOperation();
