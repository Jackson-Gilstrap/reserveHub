const {Client} = require('pg');

const client = new Client({
    host: "localhost",
    port: "5432",
    user: "postgres",
    password: "admin",
    database: "reservation",
  });
  client.connect();
  
  client.query("select * from clients;", (error, result) => {
      if(!err) {
          console.log(result.rows[0]);
      }
  
      client.end()
  })
  module.export = client;