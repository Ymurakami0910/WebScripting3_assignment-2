const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",   // Default MAMP MySQL user
  password: "root", // Default MAMP MySQL password
  database: "books", // Your database name
  port: 3306 // Default MySQL port
});


db.connect( (err) => {

  if(err) {
    console.log("ERROR!!!! " , err);
    return;
  }

  console.log("connected");

});

module.exports = db;