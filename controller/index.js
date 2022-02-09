const serviceLogic = require('../services')
const validate = require('../constant/index')

const calculateControl = async (req, res) => {
    const { monthlyInvestment, investmentPeriod, rateOfReturn, delay } = req.body

    // validating the values of user input
    if ( _validation({ monthlyInvestment, investmentPeriod, rateOfReturn, delay })) {
        res.json(validate.response.failed)
    }
    // if the values are correct then it will call the calculator function from business logic file where the actual calculation works
    else {
        let info = await serviceLogic.calculateSip({ monthlyInvestment, investmentPeriod, rateOfReturn, delay })

        res.json(info)
    }
}


const _validation = (options) => {

    let iserror = false

    if (!(options.monthlyInvestment >= 0)) {                        //investment can not be negative
        iserror = true
    } else if (!(options.investmentPeriod > 0)) {
        iserror = true
    } else if (!(options.rateOfReturn >= 0)) {
        iserror = true
    } else if (!(options.delay > 0)) {                              //months can not be negative and zero
        iserror = true
    }

    return iserror
}


module.exports = { calculateControl }