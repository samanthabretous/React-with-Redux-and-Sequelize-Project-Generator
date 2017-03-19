## Database Setup
You'll first need to setup a database for the project. Then, add a `config.json` file to `server/db/config`. You'll need to change the information to your specific database setup.

`{
  "development": {
    "username": "root",
    "password": "",
    "database": "project-generator",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": "",
    "database": "project-generator_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL"
  }
}`

## Start
First: `npm install`
To start: `npm start`

## Testing
You can add new tests in the `test` folder.

To test: `npm test`

Your tests are also automatically called as part of `npm start`
