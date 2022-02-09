
//function for calculating the sip delay
const calculateSip = async (options) => {

    const monthlyInvestment = options.monthlyInvestment
    const investmentPeriod = options.investmentPeriod
    const rateOfReturn = options.rateOfReturn
    const delay = options.delay

    const timeDuration = (investmentPeriod) * 12        //converting years into months 
    const rate = (rateOfReturn) / 12                     //calculating rate for per month
    const timeDurationAfterDelay = timeDuration - delay

    let sipGrowthToday = await _sipGrowth(monthlyInvestment, timeDuration, rate)         //amount get if start from today it will get value from sipgrowth funtion
    let sipGrowthDelay = await _sipGrowth(monthlyInvestment, timeDurationAfterDelay, rate)    //amount get if start after delay it will get value from sipgrowth funtion
    let lossFromDelay = sipGrowthToday - sipGrowthDelay    //loss get from the delay of investment



    //this is array of objects where the objects are for the showing result in graph
    let startToday =  await _graphValue("StartToday", sipGrowthToday)
    let delayedStart = await _graphValue("DelayedStart", sipGrowthDelay)
    let loss = await _graphValue("LossFromDelay", lossFromDelay)

    // Promise.all([startToday, delayedStart, loss]).then((values) => {
    //     console.log(values);
    //   });
    
    const graph =  [startToday, delayedStart, loss]

    // returing result in an object form
    const data = {
        lossFromDelay: lossFromDelay,
        delayMonths: delay,
        graph: graph
    }

    return data               //returig nested object for the graph and result
}

const _graphValue=  async (key, value)=>{
    const obj={
        key:key,
        value:value
    }
  return obj
}


//function for calculation of sipgrowth
const _sipGrowth =  async (monthlyInvestment, timeDuration, rateOfReturn) => {
    let sipCumulation = 0
    let sipGrowthResult = 0

    for (let i = 1; i <= timeDuration; i++) {
        sipCumulation = monthlyInvestment * (Math.pow((1 + rateOfReturn / 100), i))
        sipGrowthResult += sipCumulation
    }
    return sipGrowthResult
}


module.exports = { calculateSip }