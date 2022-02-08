const servicelogic = require('../services/bussinesslogic');



const Calculatecontrol = (req, res) => {
    const { monthlyinvestment, investmentperiod, rateofreturn, delay } = req.body;

    // validating the values of user input
    if (!(monthlyinvestment >= 0)) {
        throw new Error("Invalid monthlyinvestment,money can not be negative");
    } else if (!(investmentperiod > 0)) {
        throw new Error("Invalid invesmentperiod time,years can not be negative and zero");
    } else if (!(rateofreturn >= 0)) {
        throw new Error("Invalid rateofreturn,rate can not be negative");
    } else if (!(delay > 0)) {
        throw new Error("Invalid delay,delay months can not be negative and zero");
    }

    // if the values are correct then it will call the calculator function from business logic file where the actual calculation works
    else {
        var info = servicelogic.CalculateSip({monthlyinvestment, investmentperiod, rateofreturn, delay});

        res.send(info);
    }
}

module.exports = {Calculatecontrol};
