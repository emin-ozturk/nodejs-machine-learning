const express = require('express')
const KNNClassification = require('./ClassificationModels/KNN')
const MultipleLinearRegression = require('./RegressionModels/MultipleLinearRegression')
const path = require("path")
const multer = require("multer")

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())

app.get('/', async (req, res) => {
    res.render('home',
    {
        'type': null,
        'acc': 0, 
        'err': 0,
        'iteration': 0,
        'maxIterationCount': 0
    })
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname)
        const fileName = 'dataset' + fileExtension
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage })

app.post('/',  upload.single('dataset'), (req, res) => {
    const method = req.body.method
    switch (method) {
        case 'classification':
            KNNClassification.classification(res)
            break
        case 'regression':
            MultipleLinearRegression.regression(res)
            break
    }
   
})

app.listen(3000, () => {
    console.log('Server başlatıldı')
})