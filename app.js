const express = require('express')
const KNN = require('ml-knn')
const csvreader = require('csv-reader')
const fs = require('fs')
const trainTestSplit = require('train-test-split')
const MLAlgorithms  = require('jsmachinelearning')
const mse = require('mse')


const app = express()


app.get('/', async (req, res) => {
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
            const {trainX, trainY, testX, testY} = await splitTrainAndTest(data)
            
            var knn = new KNN(trainX, trainY, { k: 1 })
            var pred = knn.predict(testX)
            
            var result = await mse(pred, testY);
            res.json({'mse': result, 'acc': 1 - result})
        })
}

const readCSVFile = () => {
    return fs.createReadStream('public/dataset.csv', 'utf8')
}

const splitTrainAndTest = async (data) => {
    const [train, test] = trainTestSplit(data, 0.6, 1234)
    var [trainX, trainY] = MLAlgorithms.get_X_And_Y(train)
    var [testX, testY] = MLAlgorithms.get_X_And_Y(test)
    return {
        'trainX': trainX, 
        'trainY': trainY, 
        'testX': testX,
        'testY': testY
    }
}


app.listen(3000, () => {
    console.log('Server başlatıldı')
})