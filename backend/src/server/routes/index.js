const users = require("./users");
const projects = require("./projects");
const boards = require("./boards");
const collab = require("./note-collab");
const tasks = require("./tasks");

module.exports = function(app) {
  users(app);
  projects(app);
  boards(app);
  collab(app);
  tasks(app);
};
