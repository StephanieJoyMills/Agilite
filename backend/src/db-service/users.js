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

exports.getDesigns = async id => {
  return knex("boards")
    .where("creator_id", id)
    .andWhere("project_id", null)
    .leftJoin("templates", "templates.id", "boards.template_id")
    .select("*");
};
