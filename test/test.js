'use strict';

var assert = require('assert');
var mock = require('ruff-mock');

var any = mock.any;
var when = mock.when;
var verify = mock.verify;

var Device = require('../');

require('t');

describe('Driver LED', function () {
    var led;
    var gpio;

    beforeEach(function () {
        gpio = mock();

        led = new Device({
            gpio: gpio
        });
    });

    describe('turnOn', function () {
        it('should turn on', function (done) {
            when(gpio)
                .write(any, Function)
                .then(function (level, callback) {
                    assert.equal(level, 1);
                    setImmediate(callback);
                });

            led.turnOn(function (error) {
                assert.ifError(error);
                assert(led.isOn());
                verify(gpio).write(1, Function);
                done();
            });
        });

        it('should not write if already on', function (done) {
            when(gpio)
                .write(any, Function)
                .then(function () {
                    done('Should not write again');
                });

            led.turnOn(function (error) {
                assert.ifError(error);
                assert(led.isOn());
                done();
            });
        });
    });

    describe('turnOff', function () {
        it('should turn off', function (done) {
            led._isOn = true;

            when(gpio)
                .write(any, Function)
                .then(function (level, callback) {
                    assert.equal(level, 0);
                    setImmediate(callback);
                });

            led.turnOff(function (error) {
                assert.ifError(error);
                assert(!led.isOn());
                verify(gpio).write(0, Function);
                done();
            });
        });

        it('should not write if already off', function (done) {
            when(gpio)
                .write(any, Function)
                .then(function () {
                    done('Should not write again');
                });

            led.turnOff(function (error) {
                assert.ifError(error);
                assert(!led.isOn());
                done();
            });
        });
    });
});
