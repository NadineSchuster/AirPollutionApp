const router = require("express").Router();
const fs = require("fs");

// let dayliePoll = fs.readFile("data.json");
// let jsonPoll = JSON.parse(dayliePoll);

console.log("my Api is running");

// handling CORS as middleware
// in the header
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get("/pollMunich", (req, res) => {
  let dayliePoll = fs.readFileSync("data.json", "utf8", function () {
    console.log("Read data successfully");
  });
  let jsonPoll = JSON.parse(dayliePoll);

  console.log("Data:" + jsonPoll);

  res.status(200).send({
    data: jsonPoll,
  });
});

module.exports = router;
