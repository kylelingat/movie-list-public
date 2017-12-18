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
  idleTimeoutMillis : 1000
});

let test = require('../test-data/update.json');
let update = `UPDATE ${table} SET TITLE = '${test.title}', YEAR = ${test.year}, GENRE = '${test.genre}' WHERE ID = ${test.id};`;

module.exports.update = (event, context, callback) => {
  Client.connect()
  .then(client => {
    console.log('connected to DB' + Client.options.database);
    Client.release();
    return Client.query(update);
  })
  .then(res => {
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
