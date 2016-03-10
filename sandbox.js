/*
Note: Even though this code is written with the BB-8 Sphero in mind,
      it should work with all Spheros supported by the JavaScript SDK
*/

// Nab our settings file (make sure you make one based off of config-sample.js)
var config = require("./config");
// Get the main Sphero SDK module
var sphero = require("sphero");

// Configure your BB-8's BLE address in the config.js file
var bb8 = sphero(config.BLE);

console.log("Looking for BB-8...");

bb8.connect(function() {
  console.log("Found BB-8!");

  shakeHead();
});

var nod = function() {
  var direction = Math.floor(Math.random() * 360);
  bb8.roll(150, direction);
};

var shakeHead = function() {
  var angle = 100;
  var spacing = 200;

  bb8.roll(0, angle);

  setTimeout(function() {
    bb8.roll(0, 0);
  }, spacing);

  setTimeout(function() {
    bb8.roll(0, angle);
  }, spacing * 2);

  setTimeout(function() {
    bb8.roll(0, 0);
  }, spacing * 3);

  setTimeout(function() {
    bb8.roll(0, angle);
  }, spacing * 4);
};