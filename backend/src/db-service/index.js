const { knex } = require("./knex");
module.exports = {
  ...require("./users"),
  ...require("./projects"),
  knex
};
