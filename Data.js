const trainTestSplit = require('train-test-split')
const MLAlgorithms  = require('jsmachinelearning')

const splitTrainAndTest = async (data) => {
    const [train, test] = trainTestSplit(data, 0.7)
    // const [train, test] = trainTestSplit(data, 0.7, 1234)
    var [trainX, trainY] = MLAlgorithms.get_X_And_Y(train)
    var [testX, testY] = MLAlgorithms.get_X_And_Y(test)
    trainY = labelEncoding(trainY)
    testY = labelEncoding(testY)
    return {
        'trainX': trainX, 
        'trainY': trainY, 
        'testX': testX,
        'testY': testY
    }
}

const labelEncoding = (data) => {
    const uniqueValues = Array.from(new Set(data));
    const encodedData = data.map(value => uniqueValues.indexOf(value));
    return encodedData;
}

module.exports = {
    splitTrainAndTest
}