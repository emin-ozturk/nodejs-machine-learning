const calculateAccuracy = (pred, testY) => {
    var current = 0
    for (let i = 0; i < pred.length; i++) {
        if (pred[i] = testY[i]) {
            current++
        }
    }
    return Number((current / pred.length * 100).toFixed(2))
}

const calculateError = (accuracy) => {
    return Number((100 - accuracy).toFixed(2))
}

const calculateMAE = (pred, testY) => {
    var error, count = 0, totalError = 0
    for (let i = 0; i < pred.length; i++) {
        error = Math.abs(pred[i] - testY[i])
        totalError += error
        count++
    }
    return Number((totalError / count).toFixed(3))
}

const calculateMSE = (pred, testY) => {
    var error, count = 0, totalError = 0
    for (let i = 0; i < pred.length; i++) {
        error = pred[i] - testY[i]
        totalError += (error * error)
        count++
    }
    return Number((totalError / count).toFixed(3))
}

const calculateRMSE = (mse) => {
    return Number((Math.sqrt(mse)).toFixed(3))
}

module.exports = {
    calculateAccuracy,
    calculateError,
    calculateMAE,
    calculateMSE,
    calculateRMSE
}