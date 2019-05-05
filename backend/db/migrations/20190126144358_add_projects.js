exports.up = async function(knex, Promise) {
  const exists = await knex.schema.hasTable("projects");
  if (!exists) {
    return knex.schema.createTable("projects", function(table) {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("description");
      table
        .string("project_image_url")
        .notNullable()
        .unique();
      table
        .timestamp("created_at")
        .notNullable()
        .defaultTo(knex.fn.now());
    });
  }
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("projects");
};
