const { login, getProjects, getDesigns } = require("../../db-service");

module.exports = async function(app) {
  app.get("/login", async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const userData = await login(email);
      if (userData.password === password) {
        res.sendStatus(200);
        return { user_id: userData.id };
      }

      res.status(404).send({ error: "invalid user" });
    } catch (err) {
      console.log(
        {
          err
        },
        "Failed to login"
      );
      next(err);
    }
  });

  app.get("/user/:id/projects", async (req, res, next) => {
    const { id } = req.params;
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

  app.get("/user/:id/designs", async (req, res, next) => {
    const { id } = req.params;
    try {
      const designs = await getDesigns(id);
      res.send(designs);
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
