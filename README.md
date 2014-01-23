liquid-pid
==========

[![Build Status](https://travis-ci.org/hekike/liquid-pid.png?branch=master)](https://travis-ci.org/hekike/liquid-pid)

PID Controller in NodeJS for liquids (water, beer, etc.).
Simulator, Plots and Tests are included. 

Let's go and brew something!

https://npmjs.org/package/liquid-pid

## Installation

    $ npm install liquid-pid

## Example

    var
      liquidPID = require('liquid-pid'),
      actualP = 0,
      pidController;
    
    pidController = new liquidPID({
      temp: {
        ref: 67         // Point temperature                                       
      },
      Pmax: 1000,       // Max power (output),
      
      // Tune the PID Controller
      Kp: 25,           // PID: Kp
      Ki: 1000,         // PID: Ki
      Kd: 9             // PID: Kd
    });
    
    actualP = pidController.calculate(66.7);	// call with the actual temp
    console.log(actualP);
    
    actualP = pidController.calculate(67.0);    // call with the actual temp
    console.log(actualP);
    
    actualP = pidController.calculate(69.0);    // call with the actual temp
    console.log(actualP);
    
For more complex example please check the simulation/ dir.


## Methods

### .tune(Kp, Ki, Kd)
Configure the PID controller
For the details please check http://en.wikipedia.org/wiki/PID_controller
### .getRefTemperature()
return Number, with the actual ref temperature (what we want to reach/hold)
### .setPoint(temp)
Set new point temperature.
### .calculate(actualTemperature)
Call it continuesly to calculate the required power/output for your heater during the time.
## Simulation

### Sample 1
Reach and hold 40 °C
![alt tag](https://raw.github.com/hekike/liquid-pid/master/docs/img/simulation1.png)

### Browser simulation
http://hekike.github.io/liquid-pid/plot/app/

## Test
Tests are included.

## Other
The "liquid-pid" is used in our BIAB homebrew installation.

For more info: @slashdotpeter

------
