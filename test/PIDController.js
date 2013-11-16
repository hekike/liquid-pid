/* jshint expr: true */
'use strict';

var
  expect = require('chai').expect,
  PIDController = require('./../lib/PIDController');


describe('PIDController', function () {
  var pidController;

  before(function () {
    pidController = new PIDController({
      temp: {
        ref: 40
      }
    });
  });

  describe('instance', function () {

    it('should not be undefined', function () {
      expect(pidController).not.to.be.undefined;
    });

    it('should be set to 40deg', function () {
      expect(pidController.getRefTemperature()).to.equal(40);
    });

  });

  describe('output', function () {

    it('should be equal with 0 when the input is Equal with the ref temp', function () {
      var output = pidController.calculate(40);
      expect(output).to.equal(0);
    });

    it('should be equal with 0 when the input is Higher than the ref temp', function () {
      var output = pidController.calculate(50);
      expect(output).to.equal(0);
    });

    it('should be larger then 0 when the input is Lower than the ref temp', function () {
      var output = pidController.calculate(18);
      expect(output).to.be.above(0);
    });

    it('should be reaching the ref temp', function () {
      var
        i,
        output,
        temp = 18;

      for (i = 0; i <= 100; i++) {
        output = pidController.calculate(temp);

        if(output > 0) {
          temp += (40-18) / 100;
        }
      }

      expect(temp).to.be.at.least(40);
    });

    it('should not overheat the temp', function () {
      var
        i,
        output,
        temp = 18;

      for (i = 0; i < 150; i++) {
        output = pidController.calculate(temp);

        if(output > 0) {
          temp += (40-18) / 100;
        }
      }

      expect(temp).to.be.at.most(41);
    });

  });

});