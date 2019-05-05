const { knex } = require("./knex");
module.exports = {
  ...require("./users"),
  ...require("./projects"),
  ...require("./tasks"),
  ...require("./boards"),
  knex
};
