exports.up = async function(knex, Promise) {
  const exists = await knex.schema.hasTable("board_notes");
  if (!exists) {
    return knex.schema.createTable("board_notes", function(table) {
      table
        .integer("note_id")
        .notNullable()
        .references("notes.id")
        .onDelete("CASCADE");
      table
        .integer("board_id")
        .notNullable()
        .references("boards.id")
        .onDelete("CASCADE");
      table.primary(["note_id", "board_id"]);
    });
  }
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("board_notes");
};
