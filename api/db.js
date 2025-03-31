const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",   // Default MAMP MySQL user
  password: "root", // Default MAMP MySQL password
  database: "books", // Your database name
  port: 3306 // Default MySQL port
});


db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to the database!");
  }
});

module.exports = db;