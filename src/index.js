/*!
 * Copyright (c) 2016 Nanchao Inc.
 * All rights reserved.
 */

'use strict';

var driver = require('ruff-driver');

module.exports = driver({
    attach: function (inputs) {
        this._gpio = inputs['gpio'];
        this._isOn = false;
        this._isFlicker = false;
    },
    exports: {
        turnOn: function (callback) {
            var that = this;

            if (this._isOn) {
                invokeCallback(callback);
                return;
            }

            this._gpio.write(1, function (error) {
                that._isOn = true;
                invokeCallback(callback, error);
            });
        },
        turnOff: function (callback) {
            var that = this;

            if (!this._isOn) {
                invokeCallback(callback);
                return;
            }

            this._gpio.write(0, function (error) {
                that._isOn = false;
                invokeCallback(callback, error);
            });
        },
        isOn: function () {
            return this._isOn;
        },
        flicker: function (callback) {
            var that = this;

            if (this._isOn) {
                invokeCallback(callback);
                return;
            }

            if (this._isFlicker) {
                invokeCallback(callback);
                return;
            }

            this._isFlicker = true;
            this._gpio.write(1);
            setTimeout(function () {
                that._gpio.write(0, function (error) {
                    invokeCallback(callback, error);
                    that._isFlicker = false;
                });
            }, 50);
        }
    }
});

function invokeCallback(callback, error) {
    if (typeof callback !== 'function') {
        if (error) {
            throw error;
        } else {
            return;
        }
    }
    callback(error);
}
