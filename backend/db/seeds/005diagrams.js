exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("diagrams")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("diagrams").insert([
        {
          id: 1,
          template_id: 1,
          description: "Sprint Retro #1",
          image_url: "_",
          creator_id: 1,
          project_id: 1
        },
        {
          id: 2,
          template_id: 1,
          description: "Personal Sprint Retro",
          image_url: "_",
          creator_id: 1,
          project_id: null
        }
      ]);
    });
};
