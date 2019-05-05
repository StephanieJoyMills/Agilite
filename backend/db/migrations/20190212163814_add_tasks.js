exports.up = async function(knex, Promise) {
  const exists = await knex.schema.hasTable("tasks");
  if (!exists) {
    return knex.schema
      .createTable("tasks", function(table) {
        table.increments("id").primary();
        table
          .integer("assigned_to")
          .references("users.id")
          .onDelete("SET NULL");
        table
          .integer("assigned_by")
          .references("users.id")
          .onDelete("NO ACTION");
        table.string("description").notNullable();
        table
          .enu("status", ["complete", "in-progress", "not-started"])
          .defaultTo("not-started")
          .notNullable();
        table
          .integer("board_id")
          .notNullable()
          .references("boards.id")
          .onDelete("CASCADE");
        table
          .timestamp("created_at")
          .notNullable()
          .defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .notNullable()
          .defaultTo(knex.fn.now());
      })
      .raw(
        `CREATE OR REPLACE FUNCTION update_row_modified_function_()
            RETURNS TRIGGER
            AS
            $$
            BEGIN
            NEW.updated_at = now();
            RETURN NEW;
            END;
            $$
            language 'plpgsql';
            `
      )
      .raw(
        `CREATE TRIGGER row_mod_on_tasks_trigger_
            BEFORE UPDATE
            ON "tasks"
            FOR EACH ROW
            EXECUTE PROCEDURE update_row_modified_function_();
            `
      );
  }
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tasks");
};
