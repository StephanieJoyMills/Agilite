exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("board_notes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("board_notes").insert([
        { note_id: 2, board_id: 2 },
        { note_id: 3, board_id: 1 },
        { note_id: 4, board_id: 1 },
        { note_id: 1, board_id: 1 }
      ]);
    });
};
