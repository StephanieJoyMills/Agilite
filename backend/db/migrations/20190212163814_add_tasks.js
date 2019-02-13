exports.up = async function(knex, Promise) {
  const exists = await knex.schema.hasTable("tasks");
  if (!exists) {
    return knex.schema.createTable("tasks", function(table) {
      table.increments("id").primary();
      table
        .integer("assigned_to")
        .references("users.id")
        .onDelete("SET NULL");
      table
        .integer("assigned_by")
        .references("users.id")
        .onDelete("DO NOTHING");
      table.string("description").notNullable();
      table
        .enu("status", ["complete", "in-complete"])
        .defaultTo("in-complete")
        .notNullable();
      table
        .integer("board_id")
        .notNullable()
        .references("boards.id")
        .onDelete("CASCADE");
    });
  }
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tasks");
};
