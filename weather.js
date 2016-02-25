/*
Note: Even though this code is written with the BB-8 Sphero in mind,
      it should work with all Spheros supported by the JavaScript SDK
*/

// Nab our settings file (make sure you make one based off of config-sample.js)
var config = require('./config');
// Get the main Sphero SDK module
var sphero = require("sphero");
// Get our module for getting Wunderground information
var weather = require("./modules/weather.js");

// Configure your BB-8's BLE address in the config.js file
var bb8 = sphero(config.BLE);

console.log("Looking for BB-8...");

bb8.connect(function() {
  console.log("Found BB-8!");

  weather.getTemp(function(color) {
    bb8.color(color);
  });
});