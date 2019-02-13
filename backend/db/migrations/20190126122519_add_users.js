exports.up = async function(knex, Promise) {
  const exists = await knex.schema.hasTable("users");
  if (!exists) {
    return knex.schema.createTable("users", function(table) {
      table.increments("id").primary();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table
        .string("email")
        .notNullable()
        .unique();
      table.string("password").notNullable();
      table.string("company");
      table.string("position");
    });
  }
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
