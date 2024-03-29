const path = require('path')
const express = require('express')
const auth = require('./routes/auth')
const score = require('./routes/score')
const bodyParser = require('body-parser')
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  const envConfig = require('dotenv').config()
  if (envConfig.error) throw envConfig.error
}
// const cors = require('cors')

const server = express()
server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, './public')))

// server.use(cors('*'))

server.use('/api/v1/auth', auth)
server.use('/api/v1/score', score)

module.exports = server
