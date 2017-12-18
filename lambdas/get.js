//Kyle
'use strict';

const Pool = require('pg-pool');
const config = require('./config.json');
const {host, database, table, user, password, port, idleTimeoutMillis} = config
const Client = new Pool({
  host,
  database,
  user,
  password,
  port,
  idleTimeoutMillis
});

let getAllMovies = "SELECT * FROM " + table + "ORDER BY id ASC";

module.exports.get = (event, context, callback) => {
  Client.connect()
  .then(client => {
    console.log('connected to DB' + Client.options.database);
    Client.release();
    return Client.query(getAllMovies);
  })
  .then(res => {
    console.log(res.rows);
    const response = {
      statusCode: 200,
      body: {
        message: JSON.stringify(res.rows),
      }
    }
    callback(null, response);
  })
  .catch(err => {
    console.log(err.stack);
    const response = {
      statusCode: 200,
      body: {
        message: err.stack,
      }
    }
  callback(null, response);
})
};
