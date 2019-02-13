# Agilite Backend

- Node.js, Postgres, and Knex.js (ORM) based API

## Postgres set-up

Install Postgres with homebrew: `brew install postgresql`  
Check version: `postgres -V`  
Create our db: `createdb agilite`  
Open up psql utility: `psql postgres`  
(Optional) set password: `\password`  
Check to make sure our db was created: `\list`

## Project Set-up

create .env file based on .env-example  
install dependencies: `npm install`  
run migrations: `knex migrate:latest`  
run seeds: `knex seed:run`  
start nodemon: `npm start nodemon` or just `npm start` to run without the demon

## API Documentation

View Postman Docs: https://documenter.getpostman.com/view/2117258/RztrLSec
