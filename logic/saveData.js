const fs = require("fs");

module.exports = saveToFile = function (data) {
  let jsonData = JSON.stringify(data, null, 2);
  fs.writeFile("data.json", jsonData, done);
};

function done() {
  console.log("Data saved"); // Timestamp, Location
}
