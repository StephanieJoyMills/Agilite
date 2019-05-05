const {
  getTasksByUser,
  getTasksByBoard,
  validateUser,
  validateBoard,
  addTask,
  editTask
} = require("../../db-service");

const path = require("path");
const log = require("../logger");

module.exports = function(app) {
  app.get("/tasks/user/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const tasks = await getTasksByUser(id);
      res.send(tasks);
      return;
    } catch (err) {
      console.log(
        {
          err
        },
        "Failed to get tasks"
      );
      next(err);
    }
  });

  app.get("/tasks/board/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const tasks = await getTasksByBoard(id);
      res.send(tasks);
      return;
    } catch (err) {
      console.log(
        {
          err
        },
        "Failed to get tasks"
      );
      next(err);
    }
  });

  app.post("/addTask", async (req, res, next) => {
    const { assigned_to, assigned_by, board_id } = req.body;
    try {
      // check to make sure users exist, and board exists

      let validBy = await validateUser(assigned_by);
      let validTo = true;
      if (assigned_to !== null) {
        validTo = await validateUser(assigned_to);
      }
      if (!validBy || !validTo) {
        return res.status(404).send("Please ensure users are valid");
      }

      let validBoard = await validateBoard(board_id);
      console.log(validBoard);
      if (!validBoard) {
        return res.status(404).send("Please ensure a valid board is entered");
      }

      //Add tasks here
      await addTask(req.body);
      return res.sendStatus(200);
    } catch (err) {
      log.info({ err });
      res
        .status(500)
        .json({ error: "There was an error processing your request" });
    }
  });

  app.put("/editTask/:id", async (req, res, next) => {
    const { assigned_to } = req.body;
    const { id } = req.params;
    try {
      let validTo = true;
      if (assigned_to !== null) {
        validTo = await validateUser(assigned_to);
      }
      if (!validTo) {
        return res.status(404).send("Please ensure user is valid");
      }

      //Add tasks here
      let updatedTask = await editTask(id, req.body);

      return res.status(200).send(updatedTask);
    } catch (err) {
      log.info({ err });
      res
        .status(500)
        .json({ error: "There was an error processing your request" });
    }
  });
};
