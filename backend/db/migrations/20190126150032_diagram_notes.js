exports.up = async function(knex, Promise) {
  const exists = await knex.schema.hasTable("diagram_notes");
  if (!exists) {
    return knex.schema.createTable("diagram_notes", function(table) {
      table
        .integer("note_id")
        .notNullable()
        .references("notes.id")
        .onDelete("CASCADE");
      table
        .integer("diagram_id")
        .notNullable()
        .references("diagrams.id")
        .onDelete("CASCADE");
      table.primary(["note_id", "diagram_id"]);
    });
  }
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("diagram_notes");
};
