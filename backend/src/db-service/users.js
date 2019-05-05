const { knex } = require("./knex");

exports.getUserByEmail = async (email) => {
  const res = await knex("users")
    .select("password", "id")
    .where("email", email);
  return res[0];
};

exports.validateUser = async (id) => {
  const res = await knex("users")
    .select("email")
    .where({ id });
  return res.length > 0;
};

exports.addUser = async (email, password, firstName, lastName) => {
  let query = await knex("users")
    .insert({
      email,
      password,
      first_name: firstName,
      last_name: lastName
    })
    .returning("id");
  return query[0];
};

exports.getDesigns = async (id) => {
  return knex("boards")
    .where("creator_id", id)
    .andWhere("project_id", null)
    .leftJoin("templates", "templates.id", "boards.template_id")
    .select("*");
};
