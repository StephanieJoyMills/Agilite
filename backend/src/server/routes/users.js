const {
  getUserByEmail,
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
    const { email, password, firstName, lastName } = req.body;
    try {
      // Check to see if email is already in db

      let userExists = await getUserByEmail(email);
      if (userExists) {
        return res
          .status(404)
          .send("Email already in use. Please choose another");
      }
      const hashedPassword = bcrypt.hashSync(password, 8);

      const id = await addUser(email, hashedPassword, firstName, lastName);
      const token = jwt.sign({ id }, process.env.SECRET, {
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
    try {
      const userInfo = await getUserByEmail(email);
      if (!userInfo) {
        return res
          .status(404)
          .send({ err: "User not found", auth: false, token: null });
      }
      const passwordIsValid = bcrypt.compareSync(password, userInfo.password);
      if (!passwordIsValid) {
        return res
          .status(404)
          .send({ err: "Invalid login", auth: false, token: null });
      }
      console.log(userInfo);
      const token = jwt.sign({ id: userInfo.id }, process.env.SECRET, {
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
};
