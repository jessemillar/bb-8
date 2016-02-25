/*
Note: Even though this code is written with the BB-8 Sphero in mind,
      it should work with all Spheros supported by the JavaScript SDK
*/

// Nab our settings file (make sure you make one based off of config-sample.js)
var config = require('./config');
// Get the main Sphero SDK module
var sphero = require("sphero");

// Configure your BB-8's BLE address in the config.js file
var bb8 = sphero(config.BLE);

console.log("Looking for BB-8...");

var headPower = 10;
var moveChance = 0.25;

bb8.connect(function() {
  console.log("Found BB-8!");

  // Every second, there's a certain chance he'll move his head
  setInterval(function() {
    if (Math.random() <= moveChance) {
      // Pick a random direction
      var direction = Math.floor(Math.random() * 360);
      bb8.roll(headPower, direction);
    }
  }, 1000); // One second timeout
});