exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("boards")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("boards").insert([
        {
          id: 1,
          template_id: 1,
          description: "Sprint Retro #1",
          board_image_url: "_",
          creator_id: 1,
          project_id: 1
        },
        {
          id: 2,
          template_id: 1,
          description: "Personal Sprint Retro",
          board_image_url: "_",
          creator_id: 1,
          project_id: null
        }
      ]);
    });
};
