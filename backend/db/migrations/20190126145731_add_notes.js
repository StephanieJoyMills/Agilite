exports.up = async function(knex, Promise) {
  const exists = await knex.schema.hasTable("notes");
  if (!exists) {
    return knex.schema.createTable("notes", function(table) {
      table.increments("id").primary();
      table.string("text");
      table.string("category").notNullable();
      // default colour to yellow
      table
        .string("colour")
        .notNullable()
        .defaultTo("#ffff88");
      table.integer("order");
      table
        .integer("board_id")
        .notNullable()
        .references("boards.id")
        .onDelete("CASCADE");
    });
  }
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
