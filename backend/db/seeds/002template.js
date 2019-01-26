exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("templates")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("templates").insert([
        {
          id: 1,
          type: "Sprint Retro",
          description: "Start, Stop, Continue",
          categories: JSON.stringify(["Start", "Stop", "Continue"]),
          image_url: "_"
        }
      ]);
    });
};
