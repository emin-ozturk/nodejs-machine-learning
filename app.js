const express = require('express')
const KNNClassification = require('./ClassificationModels/KNN')
const path = require("path")
const multer = require("multer")

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())

app.get('/classification', async (req, res) => {
    res.render('home',
    {
        'acc': 0, 
        'mse': 0,
        'iteration': 0,
        'maxIterationCount': 0
    }
    )
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

app.post('/classification',  upload.single('dataset'), (req, res) => {
    
    KNNClassification.classification(res)
})

app.listen(3000, () => {
    console.log('Server başlatıldı')
})