const { getRecent, getNotes } = require("../../db-service");

const path = require("path");

module.exports = function(app) {
  app.get("/board/:id/notes", async (req, res, next) => {
    const { id } = req.params;
    try {
      const notes = await getNotes(id);
      res.send(notes);
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
  app.get("/user/:id/recent", async (req, res, next) => {
    const { id } = req.params;
    try {
      const recent = await getRecent(id);
      res.send(recent);
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
  app.get("/process_image/:image_url", async (req, res, next) => {
    const { image_url } = req.params;
    try {
      var spawnSync = require("child_process").spawnSync;

      var result = spawnSync(
        "python",
        [path.join(__dirname, "../../scripts/test.py"), "name", "lname"],
        {
          encoding: "utf8"
        }
      );
      console.log(result.stdout, result.stderr);
      res.send(result.stdout);
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
