const express = require('express')
const router = express.Router()
const { validate } = require('express-validation')
const enrollController = require('../controllers/enroll')

router.post('/', enrollController.addEnroll)

module.exports = router
