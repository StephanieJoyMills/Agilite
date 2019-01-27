const { getProject } = require("../../db-service");

module.exports = async function(app) {
  app.get("/projects/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const project = await getProject(id);
      res.send(project);
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
