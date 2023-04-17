const fs = require('fs')

const readCSVFile = () => {
    return fs.createReadStream('public/iris.csv', 'utf8')
}

module.exports = {
    readCSVFile
}