/*
Note: Even though this code is written with the BB-8 Sphero in mind,
      it should work with all Spheros supported by the JavaScript SDK
*/

// Nab our settings file (make sure you make one based off of config-sample.js)
var config = require('./config');
// Get the main Sphero SDK module
var sphero = require("sphero");
// For making requests to the Wunderground API
var http = require('http');

// Configure your BB-8's BLE address in the config.js file
var bb8 = sphero(config.BLE);

console.log("Looking for BB-8...");

// Colors correspond to temperature ranges
var temperatures = [32, 40, 50, 75, 100];
var colors = ["white", "blue", "purple", "orange", "red"];

bb8.connect(function() {
  console.log("Found BB-8!");

  var options = {
    host: "api.wunderground.com",
    path: "/api/" + config.WundergroundKey + "/conditions/q/" + config.WundergroundZip + ".json"
  };

  callback = function(response) {
    var str = "";

    // Another chunk of data has been recieved
    response.on('data', function(chunk) {
      str += chunk;
    });

    // The whole response has been recieved
    response.on('end', function() {
      var data = JSON.parse(str);
      var temp = data.current_observation.temp_f;

      // Loop through the temperatures array and apply the corresponding color
      for (var i = 0; i < temperatures.length; i++) {
        if (temp <= temperatures[i]) {
          bb8.color(colors[i]);
          break;
        }
      }
    });
  };

  http.request(options, callback).end();
});