exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("notes").insert([
        {
          id: 1,
          text: "this is text",
          category: "Start",
          colour: "red",
          board_id: 1
        },
        {
          id: 2,
          text: "this is more text",
          category: "Start",
          colour: "red",
          board_id: 1
        },
        {
          id: 3,
          text: "this is prob not the best seed",
          category: "Stop",
          colour: "purple",
          board_id: 2
        },
        {
          id: 4,
          text: "help",
          category: "Continue",
          colour: "blue",
          board_id: 1
        }
      ]);
    });
};
