const users = require("./users");
const projects = require("./projects");
const boards = require("./boards");
const collab = require("./note-collab.js");

module.exports = function(app) {
  users(app);
  projects(app);
  boards(app);
  collab(app);
};
