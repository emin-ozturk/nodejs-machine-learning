const KNN = require('ml-knn')
const csvreader = require('csv-reader')
const File = require('../File.js')
const Data = require('../Data.js')
const Calculate = require('../Calculate.js')

const classification = (res) => {
    const dataset = File.readCSVFile()
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
                const {trainX, trainY, testX, testY} = await Data.splitTrainAndTest(data)
                knn = new KNN(trainX, trainY, {k: 3})
    
                pred = knn.predict(testX)
                accuracy = Calculate.calculateAccuracy(pred, testY)

                iteration++;
            }
            
            res.json({'acc': accuracy, 'mse': Calculate.calculateError(accuracy)})
            
        })
}

module.exports = {
    classification
}