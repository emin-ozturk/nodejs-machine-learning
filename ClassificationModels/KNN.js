const KNN = require('ml-knn')
const csvreader = require('csv-reader')
const File = require('../File.js')
const Data = require('../Data.js')
const Calculate = require('../Calculate.js')

const classification = (res) => {
    const dataset = File.readCSVFile()
    const data = []
    var accuracy = 0
    dataset
        .pipe(new csvreader({ parseNumbers: true, parseBooleans: true, trim: true }))
        .on('data', (row) => {
            data.push(row)
        })
        .on('end', async () => {
            data.shift()
            
            let iteration = 1
            var pred, knn
            const maxIterationCount = 100
            while (accuracy < 80 && iteration < maxIterationCount) {
                const {trainX, trainY, testX, testY} = await Data.splitTrainAndTest(data)
                knn = new KNN(trainX, trainY, {k: 3})
    
                pred = knn.predict(testX)
                accuracy = Calculate.calculateAccuracy(pred, testY)

                iteration++;
            }
            
            res.render('home', 
                {
                    'type': 'classification',
                    'acc': accuracy, 
                    'err': Calculate.calculateError(accuracy),
                    'iteration': iteration,
                    'maxIterationCount': maxIterationCount
                }
            )
            
        })
}

module.exports = {
    classification
}