/** 

Down and dirty conversion lib specific to 
the liquid-pid npm module.

**/

// FAHRENHEIT TO CELSIUS
exports.fToC = function (tempF) {
  var cTemp = (tempF - 32) * 5/9;
  var cRounded = cTemp.toFixed(10);
  return cRounded;
};

// CELSIUS TO FAHRENHEIT
exports.cToF = function (tempC) {
  var fTemp = tempC * 9/5 + 32;
  var fRounded = fTemp.toFixed(0);
  return fRounded;
};

// KILOGRAMS TO POUNDS
exports.kgToLbs = function (weightKg) {
    var lbs = weightKg * 2.20462;
    return lbs;
};

// POUNDS TO KILOGRAMS
exports.lbsToKg = function (weightLbs) {
    var kg = weightLbs / 2.20462;
    return kg;
};

// GALLONS OF WATER TO KILOGRAMS
//  This value changes based on
//  barometric pressure and temp
//  this gets it pretty close.
exports.gallonsToKg = function (gallons) {
    var lbs = gallons * 8.32867;
    var kg = lbs / 2.20462;
    return kg;
};

// QUARTS OF WATER TO KILOGRAMS
//  This value changes based on
//  barometric pressure and temp
//  this gets it pretty close.
exports.quartsToKg = function (quarts) {
    var gals = quarts * 4;
    var lbs = gals * 8.32867;
    var kg = lbs / 2.20462;
    return kg;
};