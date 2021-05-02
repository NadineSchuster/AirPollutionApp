const express = require("express");
const server = express();
const cors = require("cors");
let PORT = 3000;

server.use(express.json());
server.use("/", require("./this.API"));
server.use(cors());

server.listen(PORT, () =>
  console.log("Server up and running." || console.log("Something went wrong."))
);
