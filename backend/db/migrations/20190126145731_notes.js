exports.up = async function(knex, Promise) {
  const exists = await knex.schema.hasTable("notes");
  if (!exists) {
    return knex.schema.createTable("notes", function(table) {
      table.increments("id").primary();
      table.string("text").notNullable();
      table.string("category");
      table.string("colour");
      table.integer("order");
    });
  }
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
