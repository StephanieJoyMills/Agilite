const users = require("./users");
const projects = require("./projects");
const boards = require("./boards");

module.exports = function(app) {
  users(app);
  projects(app);
  boards(app);
};
