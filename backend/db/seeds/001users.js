exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          name: "Steve",
          last_name: "Vulko",
          email: "Steve.V@gmail.com",
          password: "password",
          company: "Google",
          position: "UX Designer"
        },
        {
          id: 2,
          name: "Sarah",
          last_name: "Muchko",
          email: "Sarah.M@gmail.com",
          password: "password"
        },
        {
          id: 3,
          name: "Bill",
          last_name: "Martin",
          email: "Bill.M@gmail.com",
          password: "password"
        }
      ]);
    });
};
