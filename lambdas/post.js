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

let test = require('../test-data/post.json');
let movies = `INSERT INTO ${table} VALUES (${test.id}, '${test.title}', ${test.year}, '${test.genre}');`

module.exports.post = (event, context, callback) => {
  Client.connect()
  .then(client => {
    console.log('connected to DB' + Client.options.database);
    Client.release();
    return Client.query(movies);
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
