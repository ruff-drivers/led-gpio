/*!
 * Copyright (c) 2016 Nanchao Inc.
 * All rights reserved.
 */

'use strict';

var driver = require('ruff-driver');

module.exports = driver({
    attach: function (inputs, context, next) {
        this._gpio = inputs['gpio'];
        var args = context.args;
        var activeLow = args.activeLow;
        this._isOn = false;
        this._gpio.setActiveLow(activeLow, next);
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
