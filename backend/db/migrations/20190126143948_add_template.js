exports.up = async function(knex, Promise) {
  const exists = await knex.schema.hasTable("templates");
  if (!exists) {
    return knex.schema.createTable("templates", function(table) {
      table.increments("id").primary();
      table.string("type").notNullable();
      table.string("description");
      table.jsonb("categories").notNullable();
      table
        .integer("created_by")
        .references("users.id")
        .onDelete("SET NULL");
      table
        .string("template_image_url")
        .notNullable()
        .unique();
    });
  }
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("templates");
};
