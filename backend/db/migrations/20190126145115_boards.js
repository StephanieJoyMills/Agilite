exports.up = async function(knex, Promise) {
  const exists = await knex.schema.hasTable("boards");
  if (!exists) {
    return knex.schema.createTable("boards", function(table) {
      table.increments("id").primary();
      table
        .integer("template_id")
        .notNullable()
        .references("templates.id")
        .onDelete("CASCADE");
      table.string("description");
      table.string("board_image_url");
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
      table
        .timestamp("accessed_at")
        .notNullable()
        .defaultTo(knex.fn.now());
    });
  }
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("boards");
};
