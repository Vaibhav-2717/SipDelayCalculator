const express = require('express');
const Router = express.Router();

const calculatorcontroller = require('../controller/calculatorController');

//sending the request to server and performing action from controller where the controlling of data happen
Router.post('/SipDelayCalculator',calculatorcontroller.Calculatecontrol);


module.exports=Router;
