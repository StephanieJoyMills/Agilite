const { knex } = require("./knex");

exports.getProjects = async (id) => {
  personalProjects = knex("boards")
    .where("boards.project_id", null)
    .andWhere("boards.creator_id", id)
    .select("boards.id");
  teamProjects = knex("project_members")
    .where("user_id", id)
    .select("project_id");
  let projects = await knex("boards")
    .leftJoin("projects", "projects.id", "boards.project_id")
    .fullOuterJoin(
      "project_members",
      "project_members.project_id",
      "projects.id"
    )
    .leftJoin("users", "users.id", "project_members.user_id")
    .where("projects.id", id)
    .orWhere("boards.id", "in", personalProjects)
    .select(
      "*",
      "boards.id as board_id",
      "boards.name as board_name",
      "boards.created_at as board_created_at"
    );
  console.log(projects);
  // array of member -> use to check if we've "dealt" with project yet
  let projectMembers = new Map();
  let projectBoards = new Map();

  let uniqueProjects = projects.filter(function(project) {
    let name = project.name;
    if (!name) {
      name = "Personal";
    }

    let board = {
      id: project.board_id,
      name: project.board_name,
      created_at: project.board_created_at
    };

    let member = {
      first_name: project.first_name,
      last_name: project.last_name,
      email: project.email
    };
    if (projectMembers.has(name)) {
      let team = projectMembers.get(name);
      team.push(member);
      projectMembers.set(name, team);
      return false;
    } else {
      let newArr = [member];
      projectMembers.set(name, newArr);
      projectBoards.set(name, [board]);
      return true;
    }
  });

  let formattedProjects = uniqueProjects.map(function(project) {
    let name = project.name;
    if (!name) {
      name = "Personal";
    }

    boards = projectBoards.get(name);
    let newProj = {
      name,
      boards
    };
    if (name !== "Personal") {
      team = projectMembers.get(name);
      newProj = Object.assign(newProj, {
        team,
        id: project.id,
        description: project.description,
        created_at: project.created_at
      });
    }
    return newProj;
  });
  return formattedProjects;
};

exports.getRecent = async (id) => {
  return knex("boards")
    .where("creator_id", id)
    .leftJoin("templates", "templates.id", "boards.template_id")
    .select("*")
    .orderBy("accessed_at");
};

exports.getNotes = async (board_id) => {
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
