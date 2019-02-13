const bcrypt = require("bcryptjs");
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      const hashedPassword = bcrypt.hashSync("password", 8);
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          first_name: "Steve",
          last_name: "Vulko",
          email: "Steve.V@gmail.com",
          password: hashedPassword,
          company: "Google",
          position: "UX Designer"
        },
        {
          id: 2,
          first_name: "Sarah",
          last_name: "Muchko",
          email: "Sarah.M@gmail.com",
          password: hashedPassword
        },
        {
          id: 3,
          first_name: "Bill",
          last_name: "Martin",
          email: "Bill.M@gmail.com",
          password: hashedPassword
        }
      ]);
    });
};
