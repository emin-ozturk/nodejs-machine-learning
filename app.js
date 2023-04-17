const express = require('express')
const KNNClassification = require('./ClassificationModels/KNN')


const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())

app.get('/classification', async (req, res) => {
    res.render('home')
})

app.post('/classification', (req, res) => {
    KNNClassification.classification(res)
})


app.listen(3000, () => {
    console.log('Server başlatıldı')
})