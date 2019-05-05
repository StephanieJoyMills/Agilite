const { knex } = require("./knex");

exports.getTasksByUser = async (id) => {
  tasks = await knex("tasks")
    .where("tasks.assigned_to", id)
    .leftJoin("boards", "boards.id", "tasks.board_id")
    .leftJoin("users", "users.id", "tasks.assigned_by")
    .select("*");

  let assigned_to = await knex("users")
    .select("id", "first_name", "last_name", "email", "position", "company")
    .where({ id });

  return (formattedTasks = tasks.map(function(task) {
    return formatTasks(task, assigned_to);
  }));
};
// need to join with tables for more info
exports.getTasksByBoard = async (id) => {
  tasks = await knex("tasks")
    .where("tasks.assigned_to", id)
    .leftJoin("boards", "boards.id", "tasks.board_id")
    .leftJoin("users", "users.id", "tasks.assigned_by")
    .select("*");

  let assigneePromises = [];
  let uniqueUsers = new Set();

  tasks.forEach(function(task) {
    if (!uniqueUsers.has(task.assigned_by)) {
      uniqueUsers.add(task.assigned_by);
      assigneePromises.push(
        knex("users")
          .select(
            "id",
            "first_name",
            "last_name",
            "email",
            "position",
            "company"
          )
          .where("id", task.id)
      );
    }
  });
  assignees = await Promise.all(assigneePromises);
  console.log(assignees);
  uniqueUsers = new Map();
  assignees.forEach(function(user) {
    uniqueUsers.set(user[0].id, user[0]);
  });

  return (formattedTasks = tasks.map(function(task) {
    let assigned_to = uniqueUsers.get(task.assigned_to);
    return formatTasks(task, assigned_to);
  }));
};

exports.addTask = async (taskObj) => {
  return knex("tasks").insert(taskObj);
};

exports.editTask = async (id, taskObj) => {
  await knex("tasks")
    .where({ id })
    .update(taskObj)
    .returning("id");

  task = (await knex("tasks")
    .where("tasks.id", id)
    .leftJoin("boards", "boards.id", "tasks.board_id")
    .leftJoin("users", "users.id", "tasks.assigned_by")
    .select("*"))[0];

  let assigned_to = await knex("users")
    .select("id", "first_name", "last_name", "email", "position", "company")
    .where("id", task.assigned_to);

  return formatTasks(task, assigned_to);
};

function formatTasks(task, assigned_to) {
  return {
    id: task.id,
    description: task.description,
    status: task.status,
    assigned_to,
    assigned_by: {
      id: task.assigned_by,
      first_name: task.first_name,
      last_name: task.last_name,
      email: task.email,
      company: task.company,
      position: task.position
    },
    board: {
      id: task.board_id,
      template_id: task.template_id,
      image_url: task.board_image_url,
      creator_id: task.creator_id,
      project_id: task.project_id
    }
  };
}
