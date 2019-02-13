exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("tasks")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("tasks").insert([
        {
          id: 1,
          assigned_to: 1,
          assigned_by: 1,
          description: "upload image",
          board_id: 1
        }
      ]);
    });
};
