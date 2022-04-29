const express = require('express')
const router = express.Router()
const controller = require('../controllers/tricks.js')

// router.get('/',controller.getAllUsers)
router.get('/:id',controller.getUser)
router.post('/login', controller.login)


module.exports = router;