const bunyan = require("bunyan");

const log = bunyan.createLogger({
  name: "Agilite",
  streams: [
    {
      stream: process.stdout,
      level: "info"
    },
    {
      stream: process.stderr,
      level: "error"
    }
  ]
});

module.exports = log;
