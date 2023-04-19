const {SimpleLinearRegression } = require('jsmachinelearning')
const csvreader = require('csv-reader')
const File = require('../File.js')
const Data = require('../Data.js')
const Calculate = require('../Calculate.js')


const regression = (res) => {
    const dataset = File.readCSVFile()
    var model = new SimpleLinearRegression()
    const data = []
    var mse = 0, mae = 0
    dataset
        .pipe(new csvreader({ parseNumbers: true, parseBooleans: true, trim: true }))
        .on('data', (row) => {
            data.push(row)
        })
        .on('end', async () => {
            data.shift()
            
            let iteration = 1
            var pred
            const maxIterationCount = 100

            do {
                const {trainX, trainY, testX, testY} = await Data.splitTrainAndTest(data)
                model.fit(trainX, trainY)
    
                var pred = model.predict(testX)
                mse = Calculate.calculateMSE(pred, testY)
                mae = Calculate.calculateMAE(pred, testY)
                console.log(mse)
                iteration++;
            } while (mse > 0.6 && iteration <= maxIterationCount)

            res.render('home', 
                {
                    'type': 'regression',
                    'mae': mae, 
                    'mse': mse, 
                    'rmse': Calculate.calculateRMSE(mse), 
                    'iteration': iteration,
                    'maxIterationCount': maxIterationCount
                }
            )
            
        })
}

module.exports = {
    regression
}