var config = require('../config');
var http = require('http');

module.exports = {
  getTemp: function(callback) {
    // Colors correspond to temperature ranges
    var temperatures = [32, 40, 50, 75, 100];
    var colors = ["white", "blue", "purple", "orange", "red"];

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
            callback(colors[i]);
            return;
          }
        }
      });
    };

    http.request(options, callback).end();
  }
};