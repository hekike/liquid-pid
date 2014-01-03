/* global Chart */

(function (Chart, temp) {
  'use strict';

  var
    PIDController = require('./../../../lib/PIDController'),
    lineChartData,

    cWater = 4183.2,                                      // Heat capacity J/(kg*°C)
    m = 40.0,                                             // Weigh of the water (kg)
    Ta = 25,                                              // Temperature of the environment (your room, etc.) (°C)
    Rth = 0.024,                                          // Thermal conductivity, total thermal resistance between
    // the water and the surrounding ambient (°C/W)
    // List: http://www.engineeringtoolbox.com/thermal-conductivity-d_429.html
    Pmax = 4000,

    StopTime = 3600,                                      // Total time of the simulation (s)
    deltaT,                                               // Delta temperature
    T0 = 48,                                              // Start temperature of the water (°C)
    Takt = T0,                                            // Actual temperature of the water (°C)
    dt = 0.25,                                            // Discrete time step (s)
    Pactual,
    t,
    k,
    controller,

    labels = [],
    dataT = [],
    dataPWM = [];


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
      labels.push(t / 60);
      dataT.push(Takt);
      dataPWM.push((Pactual / Pmax * 100));
    }
  }


  lineChartData = {
    labels: labels,
    datasets: [
      {
        fillColor: 'rgba(255,0,0,0.2)',
        strokeColor: 'rgba(255,0,0,0.4)',
        pointColor: 'rgba(255,0,0,0.4)',
        pointStrokeColor: '#fff',
        data: dataPWM
      },
      {
        fillColor: 'rgba(0,0,255,0.2)',
        strokeColor: 'rgba(0,0,255,0.4)',
        pointColor: 'rgba(0,0,255,0.4)',
        pointStrokeColor: '#fff',
        data: dataT
      }
    ]

  };

  new Chart(document.getElementById('canvas').getContext('2d')).Line(lineChartData);

}(Chart, 60));
