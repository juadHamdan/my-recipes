const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const recipesApi = require('./server/routes/recipes-api')

const app = express()
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', recipesApi)

const port = 3001
app.listen(port, () => console.log(`Running on ${port}`))