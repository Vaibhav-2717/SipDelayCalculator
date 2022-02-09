const express = require('express')
const router = express.Router()

const calculatorController = require('../controller')

//sending the request to server and performing action from controller where the controlling of data happen
router.post('/SipDelayCalculator', calculatorController.calculateControl)


module.exports = router