//ideally we should set up a master and replica db; where the master is used purely for writes (or reads that directly follow writes)
require("dotenv").config();

const knexFile = require("../../knexfile");
const environment = process.env.ENVIRONMENT || "development";
const knexConfig = knexFile[environment];

console.log("Connecting to database...");
const knex = (exports.knex = require("knex")(knexConfig));

knex.raw("select 1+1 as result").then(function() {
  console.log("database connected!");
});
