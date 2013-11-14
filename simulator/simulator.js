'use strict';

var
  fs = require('fs'),
  util = require('util'),

  PIDController = require('./../lib/PIDController'),

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
    m = 40.0,                                             // Weigh of the water (kg)
    Ta = 25,                                              // Temperature of the environment (your room, etc.) (°C)
    Rth = 0.024,                                          // Thermal conductivity, total thermal resistance between
                                                          // the water and the surrounding ambient (°C/W)
                                                          // List: http://www.engineeringtoolbox.com/thermal-conductivity-d_429.html
    Pmax = 4000,

    outFile = fs.createWriteStream('./simulator/output.csv'),
    StopTime = 3600,                                      // Total time of the simulation (s)
    deltaT,                                               // Delta temperature
    T0 = 18,                                              // Start temperature of the water (°C)
    Takt = T0,                                            // Actual temperature of the water (°C)
    dt = 0.25,                                            // Discrete time step (s)
    Pactual,
    t,
    k,
    controller;

  // Create a new controller
  controller = new PIDController({
    temp: {
      ref: temp,                                          // Point temperature (This is the temp what you want to reach and hold) (°C)
      Pmax: Pmax                                          // Max Power, this is the maximum output of your heater (W)
    }
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
      outFile.write(util.format('%d %d %d %d\n', round(t / 60, 1), round(Takt, 1000), round((Pactual / Pmax) * 100, 1), round(Pactual, 1)));
    }
  }

  // Close the file stream
  outFile.end();
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
