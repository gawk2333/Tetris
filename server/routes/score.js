const express = require('express')
const router = express.Router()
const { scoreUpdate } = require('../controller/score')

router.post('/update', scoreUpdate)

module.exports = router
