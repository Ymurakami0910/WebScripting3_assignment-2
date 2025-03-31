const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",   
  password: "root", 
  database: "books", 
  port: 3306  // MAMP default settings
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("✅ Connected to the database!");
  }
});

module.exports = db;
