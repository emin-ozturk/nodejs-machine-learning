const express = require('express')
const KNNClassification = require('./ClassificationModels/KNN')
const MultipleLinearRegression = require('./RegressionModels/MultipleLinearRegression')
const SimpleLinearRegression = require('./RegressionModels/SimpleLinearRegression')
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
    const { method, algorithm } = req.body
    switch (method) {
        case 'classification':
            KNNClassification.classification(res)
            break
        case 'regression':
            if (algorithm == 'MultipleLinearRegression') {
                MultipleLinearRegression.regression(res)
            } else if (algorithm == 'SimpleLinearRegression') {
                SimpleLinearRegression.regression(res)
            }
            break
    }
   
})

app.get('/method/:value', (req, res) => {
    const value = req.params.value
    switch (value) {
        case 'classification':
            res.json({'methods': ['K-Nearest Neighbors']})
            break;
        case 'regression':
            res.json({'methods': ['MultipleLinearRegression'/*, 'SimpleLinearRegression'*/]})
            break;
        
    }
})

app.listen(3000, () => {
    console.log('Server başlatıldı')
})