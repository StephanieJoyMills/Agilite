exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("diagram_notes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("diagram_notes").insert([
        { note_id: 1, diagram_id: 1 },
        { note_id: 2, diagram_id: 2 },
        { note_id: 3, diagram_id: 1 },
        { note_id: 4, diagram_id: 1 }
      ]);
    });
};
