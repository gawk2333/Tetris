const express = require('express')
const router = express.Router()
const { scoreUpdate, scoreBoard } = require('../controller/score')

router.post('/update', scoreUpdate)
router.get('/board', scoreBoard)

module.exports = router
