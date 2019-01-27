const { knex } = require("./knex");

exports.getProject = async id => {
  const members = await knex("project_members")
    .where("project_id", id)
    .select("*");

  const boards = await knex("boards")
    .where("project_id", id)
    .select("*");

  const project = await knex("projects")
    .where({ id })
    .select("*");

  const obj = { project, boards, members };
  return obj;

  //   .leftJoin("boards", "boards.project_id", "projects.id");
  // return (
  //   knex("projects")
  //     .where("projects.id", id)
  //     .leftJoin("project_members", "project_members.project_id", "projects.id")
  //     .leftJoin("boards", "boards.project_id", "projects.id")
  // .leftJoin("board_notes", "board_notes.board_id", "boards.id")
  // .leftJoin("notes", "notes.id", "board_notes.note_id")
  // .select("*")
};

exports.getRecent = async id => {
  return knex("boards")
    .where("creator_id", id)
    .leftJoin("templates", "templates.id", "boards.template_id")
    .select("*")
    .orderBy("accessed_at");
};

exports.getNotes = async board_id => {
  return knex("board_notes")
    .where("board_notes.board_id", board_id)
    .leftJoin("notes", "notes.id", "board_notes.note_id")
    .select("*");
};
