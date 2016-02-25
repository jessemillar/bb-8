/*
Note: Even though this code is written with the BB-8 Sphero in mind,
      it should work with all Spheros supported by the JavaScript SDK
*/

// Get the main Sphero SDK module
var sphero = require("sphero");
// Nab our settings file (make sure you make one based off of config-sample.js)
var config = require('./config');

// Configure your BB-8's BLE address in the config.js file
var bb8 = sphero(config.BLE);

console.log("Looking for BB-8...");

bb8.connect(function() {
  console.log("Found BB-8!");

  // // Turn BB-8's light off
  // bb8.color("black");
  //
  // // Have BB-8 tell us when it detect collisions
  // bb8.detectCollisions();
  //
  // // When BB-8 detects a collision, turn red for a second, then back to green
  // bb8.on("collision", function(data) {
  //   console.log("Collision detected!");
  //   console.log("Collision data:", data);
  //
  //   bb8.color("red");
  //
  //   setTimeout(function() {
  //     bb8.color("black");
  //   }, 1000);
  // });

  // Roll BB-8 in a random direction, changing direction every second
  setInterval(function() {
    if (Math.random() > 0.75) {
      // Pick a random direction
      var direction = Math.floor(Math.random() * 360);
      // Is 150 the intensity of the roll...?
      bb8.roll(10, direction);
    }
  }, 1000); // One second timeout
});