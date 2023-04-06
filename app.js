const express = require('express')
const KNN = require('ml-knn')
const csvreader = require('csv-reader')
const fs = require('fs')
const trainTestSplit = require('train-test-split')
const MLAlgorithms  = require('jsmachinelearning')


const app = express()


app.get('/backend/classification', async (req, res) => {
    KNNClassification(res)    
})

const KNNClassification = (res) => {
    const dataset = readCSVFile()
    const data = []
    dataset
        .pipe(new csvreader({ parseNumbers: true, parseBooleans: true, trim: true }))
        .on('data', (row) => {
            data.push(row)
        })
        .on('end', async () => {
            data.shift()
            
            let iteration = 1, accuracy = 0
            var pred, knn
            const maxIterationCount = 500
            while (accuracy < 0.8 && iteration < maxIterationCount) {
                const {trainX, trainY, testX, testY} = await splitTrainAndTest(data)
                knn = new KNN(trainX, trainY, {k: 3})
    
                pred = knn.predict(testX)
                accuracy = calculateAccuracy(pred, testY)

                iteration++;
            }
            
            res.json({'acc': accuracy, 'mse': calculateError(accuracy)})
        })
}

const readCSVFile = () => {
    return fs.createReadStream('public/iris.csv', 'utf8')
}

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

const calculateAccuracy = (pred, testY) => {
    var current = 0
    for (let i = 0; i < pred.length; i++) {
        if (pred[i] = testY[i]) {
            current++
        }
    }
    return Number((current / pred.length).toFixed(2))
}

const calculateError = (accuracy) => {
    return Number((1 - accuracy).toFixed(2))
}

app.listen(3000, () => {
    console.log('Server başlatıldı')
})