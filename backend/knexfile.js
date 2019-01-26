// As this project will not require stagin or production I removed them
require("dotenv").config();

const pool = {
  min: parseInt(process.env.MIN_DB_CONNECTION || 2, 10),
  max: parseInt(process.env.MAX_DB_CONNECTION || 10, 10),
  idleTimeoutMillis: 20000
};

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.PG_DB_NAME,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD
    },
    pool,
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds"
    }
  }
};
