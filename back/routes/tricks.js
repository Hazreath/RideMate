const express = require('express')
const router = express.Router()
const controller = require('../controllers/tricks.js')

// router.get('/',controller.getAllUsers)
router.get('/:id',controller.getTricksFromUser)
router.get('/', controller.getAllTricks)
router.post('/', controller.addTrick)


module.exports = router;