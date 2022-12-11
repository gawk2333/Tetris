const path = require('path')
const express = require('express')
const auth = require('./routes/auth')
const bodyParser = require('body-parser')
require('dotenv').config()
// const cors = require('cors')

const server = express()
server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, './public')))

// server.use(cors('*'))

server.use('/api/v1/auth', auth)

module.exports = server
