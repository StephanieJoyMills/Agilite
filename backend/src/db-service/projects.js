const { knex } = require("./knex");

exports.getProjects = async id => {
  personalProjects = knex("boards")
    .where("boards.project_id", null)
    .andWhere("boards.creator_id", id)
    .select("boards.id");

  return knex("boards")
    .select("*")
    .leftJoin("projects", "projects.id", "boards.project_id")
    .leftJoin("project_members", "project_members.project_id", "projects.id")
    .where("project_members.user_id", id)
    .orWhere("boards.id", "in", personalProjects);
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

exports.insertNote = (board_id, note) => {
  return knex("notes")
    .insert(note)
    .returning("id")
    .then(function(id) {
      return knex("board_notes").insert({ note_id: id[0], board_id });
    });
};
