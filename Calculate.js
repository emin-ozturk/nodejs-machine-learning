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

module.exports = {
    calculateAccuracy,
    calculateError
}