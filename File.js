const fs = require('fs')

const readCSVFile = () => {
    return fs.createReadStream('uploads/dataset.csv', 'utf8')
}

module.exports = {
    readCSVFile
}