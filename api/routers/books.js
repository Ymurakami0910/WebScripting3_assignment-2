const express = require("express");
const multer = require("../storage"); // Import your multer storage configuration
const db = require("../db"); // ✅ MySQL connection import

const router = express.Router();

// CREATE a new book (with image upload)
router.post("/", multer.single("image"), (req, res) => {
  const { title, author, description } = req.body;  // Make sure 'author' and 'description' are extracted from req.body
  const image = req.file ? req.file.filename : null;

  // SQL query to insert book data into the MySQL database
  const query = "INSERT INTO books (title, author, description, image) VALUES (?, ?, ?, ?)";
  
  db.query(query, [title, author, description, image], (err, result) => {
    if (err) {
      console.log("Error inserting data:", err);
      return res.status(500).json({ error: "Failed to insert book" });
    }
    res.status(201).json({
      message: "Book added successfully",
      bookId: result.insertId,
    });
  });
});


// READ all books
router.get("/", (req, res) => {
  const query = "SELECT * FROM books";
  db.query(query, (err, result) => {
    if (err) {
      console.log("Error fetching books:", err);
      return res.status(500).json({ error: "Failed to fetch books" });
    }
    res.status(200).json(result);
  });
});

// READ a single book by ID
router.get("/:id", (req, res) => {
  const query = "SELECT * FROM books WHERE id = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.log("Error fetching book:", err);
      return res.status(500).json({ error: "Failed to fetch book" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(result[0]);
  });
});

// UPDATE a book by ID
router.put("/:id", (req, res) => {
  const { title, author } = req.body;
  const query = "UPDATE books SET title = ?, author = ? WHERE id = ?";
  db.query(query, [title, author, req.params.id], (err, result) => {
    if (err) {
      console.log("Error updating book:", err);
      return res.status(500).json({ error: "Failed to update book" });
    }
    res.status(200).json({ message: "Book updated successfully" });
  });
});

// DELETE a book by ID
router.delete("/:id", (req, res) => {
  const query = "DELETE FROM books WHERE id = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.log("Error deleting book:", err);
      return res.status(500).json({ error: "Failed to delete book" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  });
});

module.exports = router;
