const {
  getUser,
  addUser,
  getProjects,
  getDesigns
} = require("../../db-service");
// jwt setup
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const log = require("../logger");

module.exports = async function(app) {
  app.post("/signup", async (req, res, next) => {
    const { email, password } = req.body;
    let firstName = req.body.first_name;
    let lastName = req.body.last_name;
    try {
      // Check to see if email is already in db

      let userExists = await getUser(email);
      if (userExists) {
        return res
          .status(404)
          .send("Email already in use. Please choose another");
      }

      const hashedPassword = bcrypt.hashSync(password, 8);
      console.log(hashedPassword);
      const status = await addUser(email, hashedPassword, firstName, lastName);
      console.log(status);
      const token = jwt.sign({ id: email }, process.env.secret, {
        expiresIn: 86400 // 25 hours
      });
      return res.status(200).send({ auth: true, token });
    } catch (err) {
      log.info({ err });
      res
        .status(500)
        .json({ error: "There was an error processing your request" });
    }
  });

  app.get("/login", async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const userData = await getUser(email);
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
