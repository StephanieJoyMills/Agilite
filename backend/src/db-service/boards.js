const { knex } = require("./knex");

exports.validateBoard = async (id) => {
  res = await knex("boards")
    .select("id")
    .where({ id });
  return res.length > 0;
};
