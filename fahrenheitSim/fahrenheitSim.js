'use strict';

var
  util = require('util'),

  PIDController = require('./../lib/PIDController'),
  
  convert = require('./../lib/convert'),

  round;


/**
 * Simulator
 * Simulate the PID controller
 *
 * @method simulate
 * @param {Number} temp Point temperature
 */
exports.simulate = function (temp) {
  var                            
  
    cWater = 4183.2,                                      // Heat capacity J/(kg*°C)
    m = convert.gallonsToKg(11),                          // m is looking for the weight of the water kg, use the convert.js lib to be able to enter gallons or quarts instead.
    Ta = 25,                                              // Temperature of the environment (your room, etc.) (°C)
    Rth = 0.024,                                          // Thermal conductivity, total thermal resistance between
                                                          // the water and the surrounding ambient (°C/W)
                                                          // List: http://www.engineeringtoolbox.com/thermal-conductivity-d_429.html
    Pmax = 4000,

    StopTime = 3600,                                      // Total time of the simulation (s)
    deltaT,                                               // Delta temperature
    T0 = Math.round(convert.fToC(90)),                    // Start temperature of the water (°C converted from °F using the convert.js lib then rounded)
    Takt = T0,                                            // Actual temperature of the water (°C)
    dt = 0.25,                                            // Discrete time step (s)
    Pactual,
    t,
    k,
    controller;

  // Create a new controller
  controller = new PIDController({
    temp: {
      ref: convert.fToC(temp)                             // Point temperature (This is the temp what you want to reach and hold converted to °C from °F using the convert lib)      
    },
    Pmax: Pmax                                            // Max Power, this is the maximum output of your heater (W)
  });

  // Simulate
  for (k = 0; k < (StopTime / dt); k++) {
    t = k * dt;                                           // Calculate the actual time

    // Calculate the actual power
    Pactual = controller.calculate(Takt);

    // Delta Temperature in the k. step
    deltaT = (Pactual - (Takt - Ta) / Rth) * dt / (cWater * m);
    
    Takt += deltaT;

    // Write every 30. status into the log file
    if (t % 30 === 0) {
        console.log(util.format('Time: %d Actual Temp: %d Output: %d Wattage: %d\n', round(t / 60, 1), convert.cToF(Takt), round((Pactual / Pmax) * 100, 1), round(Pactual, 1)));
    }
  }
};


/**
 * Round number
 * Helper
 *
 * @method round
 * @param {Number} original
 * @param {Number} roundTo
 * @return {Number} rounded output
 */
round = function (original, roundTo) {
  return Math.round(original * roundTo) / roundTo;
};
