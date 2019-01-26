const { knex } = require("./knex");

exports.login = async email => {
  const res = await knex("users")
    .select("password", "id")
    .where("email", email);
  return res[0];
};

exports.getProjects = async id => {
  return knex("project_members")
    .where("user_id", id)
    .leftJoin("projects", "projects.id", "project_members.project_id")
    .select("*");
};
