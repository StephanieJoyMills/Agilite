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
    console.log(req.body);
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
      const token = jwt.sign({ id: email }, process.env.SECRET, {
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

  app.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
      const userInfo = await getUser(email);
      const passwordIsValid = bcrypt.compareSync(password, userInfo.password);
      if (!passwordIsValid) {
        return res
          .status(404)
          .send({ err: "Invalid login", auth: false, token: null });
      }

      const token = jwt.sign({ id: email }, process.env.SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });
      return res.status(200).send({ auth: true, token });
    } catch (err) {
      log.info({ err });
      res
        .status(500)
        .json({ error: "There was an error processing your request" });
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
