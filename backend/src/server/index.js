require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const logger = require("morgan");
app.use(logger("dev"));

require("./routes/index.js")(app);

app.listen(port, () => {
  console.log({ port }, "Server starting...");
});

module.exports = app;
