const express = require('express')
const path = require('path')
const http = require('http')
const hbs = require('hbs')
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const jobRouter = require('./routers/jobs')

const app = express()
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(jobRouter)

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {title: 'Main Page'})
})

app.get('/mentors', (req, res) => {
    res.render('mentors', {title: 'Mentors'})
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})