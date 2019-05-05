const {
  getProjects,
  validateUser,
  getProjectTeam,
  addProjectMember
} = require("../../db-service");
let reduce = require("lodash.reduce");

module.exports = async function(app) {
  app.get("/user/me/projects", app.authenticate, async (req, res, next) => {
    const { id } = req;
    try {
      const projects = await getProjects(id);
      res.send({ projects });
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
  app.post(
    "/user/me/project/:project_id/add_member/:user_id",
    app.authenticate,
    async (req, res, next) => {
      const { project_id, user_id } = req.params;
      try {
        let validUser = await validateUser(user_id);
        if (!validUser) {
          return res.status(404).send("Please ensure user is valid");
        }
        let projectMembers = await getProjectTeam(project_id);
        let alreadyMember = false;

        for (i = 0; i <= projectMembers.length - 1; i++) {
          if (projectMembers[i].user_id == user_id) {
            alreadyMember = true;
            break;
          }
        }
        if (alreadyMember) {
          return res.status(400).send("User is already a member of the team");
        }
        await addProjectMember(project_id, user_id);
        return res.sendStatus(200);
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ error: "There was an error processing your request" });
      }
    }
  );
};
