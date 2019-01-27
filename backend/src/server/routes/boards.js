const { getRecent, getNotes, insertNote } = require("../../db-service");

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
  app.get("/process_image/:image_url/diagram/:id", async (req, res, next) => {
    let { image_url, id } = req.params;
    let image = `http://storage.googleapis.com/delta-hacks/${image_url}`;

    try {
      var spawnSync = require("child_process").spawnSync;

      var result = spawnSync(
        "python",
        [path.join(__dirname, "../../scripts/text-extraction.py"), image],
        {
          encoding: "utf8"
        }
      );
      let notes = result.stdout.split("*").filter(function(el) {
        return el.length > 2;
      });

      notes.forEach(function(value) {
        let note = JSON.parse(value);
        insertNote(id, note);
      });

      res.sendStatus(200);
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
