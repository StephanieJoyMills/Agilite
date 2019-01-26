exports.up = async function(knex, Promise) {
  const exists = await knex.schema.hasTable("diagrams");
  if (!exists) {
    return knex.schema.createTable("diagrams", function(table) {
      table.increments("id").primary();
      table
        .integer("template_id")
        .notNullable()
        .references("templates.id")
        .onDelete("CASCADE");
      table.string("description");
      table.string("image_url");
      table
        .integer("creator_id")
        .notNullable()
        .references("users.id")
        .onDelete("CASCADE");
      table
        .integer("project_id")
        .references("projects.id")
        .onDelete("CASCADE");
      table
        .timestamp("created_at")
        .notNullable()
        .defaultTo(knex.fn.now());
    });
  }
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("diagrams");
};
