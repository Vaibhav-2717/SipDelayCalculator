
//function for calculating the sip delay
const CalculateSip = (BodydData) => {

    var monthlyinvestment = BodydData.monthlyinvestment;
    var investmentperiod = BodydData.investmentperiod;
    var rateofreturn = BodydData.rateofreturn;
    var delay = BodydData.delay;


    var timeduration = (investmentperiod) * 12;        //converting years into months 
    var rate = (rateofreturn) / 12;                     //calculating rate for per month
    var timedurationafterdelay = timeduration - delay;

    var sipGrowthToday = sipgrowth(monthlyinvestment, timeduration, rate);         //amount get if start from today it will get value from sipgrowth funtion
    var sipGrowthDelay = sipgrowth(monthlyinvestment, timedurationafterdelay, rate);    //amount get if start after delay it will get value from sipgrowth funtion

    var lossFromDelay = sipGrowthToday - sipGrowthDelay;     //loss get from the delay of investment


    // returing result in an object form
    var allinvestmentinfo = {
        sipGrowthToday: sipGrowthToday,
        sipGrowthDelay: sipGrowthDelay,
        lossFromDelay: lossFromDelay
    }
  //this is array of objects where the objects are for the showing result in graph
    let graphValue = [{
        name: "StartToday",             //name is for x-axis
        amount: sipGrowthToday             //amount is for y-axis
    },
    {
        name: "DelayedStart",
        amount: sipGrowthToday
    },
    {
        name: "Loss",
        amount: lossFromDelay
    }]


    return { allinvestmentinfo, graphValue };                 //returig nested object for the graph and result
}

//function for calculation of sipgrowth
function sipgrowth(monthlyinvestment, timeduration, rateofreturn) {
    var sipCumulation = 0;
    var sipGrowthResult = 0;

    for (let i = 1; i <= timeduration; i++) {
        sipCumulation = monthlyinvestment * (Math.pow((1 + rateofreturn / 100), i));
        sipGrowthResult += sipCumulation;
    }

    return sipGrowthResult;
}


module.exports = { CalculateSip };