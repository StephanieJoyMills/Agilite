exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("projects")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        {
          id: 1,
          name: "AngelEth",
          description: "A blockchain application for small investory",
          project_image_url: "_"
        }
      ]);
    });
};
