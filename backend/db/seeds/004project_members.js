exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("project_members")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("project_members").insert([
        { user_id: 1, project_id: 1 },
        { user_id: 2, project_id: 1 },
        { user_id: 3, project_id: 1 }
      ]);
    });
};
