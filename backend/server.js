require('dotenv').config()

const app = require('./app')
const mongoose = require('mongoose')
const port = 3001

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true }, err => {
    if (err) {
        console.log('Oh no', err)
        return
    }
    app.listen(port, () => {
        console.log(`App listening at port ${port}`)
    })
})