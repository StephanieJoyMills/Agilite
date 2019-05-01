const { getProjects } = require("../../db-service");

module.exports = async function(app) {
  app.get("/user/me/projects", app.authenticate, async (req, res, next) => {
    const { id } = req;
    try {
      const projects = await getProjects(id);
      res.send(projects);
      return;
    } catch (err) {
      console.log(
        {
          err
        },
        "Failed to get projects"
      );
      next(err);
    }
  });
};
