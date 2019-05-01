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

## Technology Choices

For the API, I investigated Python, Java, and Node. **Node** was selected for the following reasons:

- Unifies language and JSON data format across the stack.
- Ideal for real-time websites with push capability (Our interaction with GitHub will be event-driven).
- Lightweight and efficient for data-intensive real-time applications; making them fast and scalable.
- Huge community for support.
- personal experience building Node APIs.

For the machine learning component, investigated Node and Python. **Python** was selected for the following reasons:

- Large number of available packages (numpy, pandas, scikit, tensorflow, etc).
- Strong community for support.
- Although using Node would allow us to build the full application in the same language, Node does not have nearly as many packages and is not recommended for compute-heavy operations.

For the database, we investigated MySQL, PostgreSQL, and MongoDB. **PostgreSQL** was selected for the following reasons:

- Open-source and strong community for support.
- JSONB support (indexable) and NoSQL data types.
- Postgres is a ORDBMS, and therefore has the benefits of relational and non-relational databases.
- Scalable with potential sharding (i.e. citus), indexing and logic replication.
- As this is being used with node, a potential infrastructure improvement would be to use a message queue (i.e. RabbitMQ) and a better performing backend service.

For the ORM, we will use **Knex.js**:

- A relatively mature ORM for Node that makes accessing relational databases simple with features such as data access setup and DB schema migrations support tools.
- Existing experience with this tool.

## Testing

- Integration testing using mocha and supertest
