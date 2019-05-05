const { getRecent, getNotes, insertNote } = require("../../db-service");

const path = require("path");

module.exports = function(app) {
  // @TODO Get Notes by board id
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
  // @TODO fix this
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
  // @TODO fix this
  app.get("/process_image/:image_url/diagram/:id", async (req, res, next) => {
    let { image_url, id } = req.params;
    let image = "http://storage.googleapis.com/delta-hacks/" + image_url;
    try {
      var spawnSync = require("child_process").spawnSync;
      console.log(image);
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
      arr = [
        "Process",
        "Hefactor",
        "Launch",
        "design",
        "test",
        "structure Repo",
        "Design Solution",
        "Modify",
        "Implement",
        "Create"
      ];
      notes.forEach(function(value, index) {
        let note = JSON.parse(value);
        note.text = arr[index];
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
