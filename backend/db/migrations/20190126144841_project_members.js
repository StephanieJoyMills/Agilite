exports.up = async function(knex, Promise) {
  const exists = await knex.schema.hasTable("project_members");
  if (!exists) {
    return knex.schema.createTable("project_members", function(table) {
      table
        .integer("user_id")
        .notNullable()
        .references("users.id")
        .onDelete("CASCADE");
      table
        .integer("project_id")
        .notNullable()
        .references("projects.id")
        .onDelete("CASCADE");
      table.primary(["project_id", "user_id"]);
      table
        .timestamp("created_at")
        .notNullable()
        .defaultTo(knex.fn.now());
    });
  }
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("project_members");
};
