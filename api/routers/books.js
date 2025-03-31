const express = require("express");
const multer = require("../storage"); // Import your multer storage configuration
const db = require("../db"); // ✅ MySQL connection import

const router = express.Router();

// CREATE a new book (with image upload)
router.get("/", (req, res) => {
  const author = req.query.author;
  let query = "SELECT * FROM books";
  let params = [];

  // If 'author' is specified, filter the books by author
  if (author) {
    // If an author is specified, filter by the author (using LIKE for partial match)
    query += " WHERE author LIKE ?";
    params.push('%' + author + '%'); // Adding wildcard for partial match
  }

  // Ensure that query is executed only if there are parameters
  db.query(query, params, (err, result) => {
      if (err) {
          console.log("Error fetching books:", err);
          return res.status(500).json({ error: "Failed to fetch books" });
      }

      // Check if result is empty and handle it
      if (result.length === 0) {
          return res.status(404).json({ error: "No books found for the specified author" });
      }

      // Return the filtered books
      res.status(200).json(result); 
  });
});



// READ all books
router.get("/", (req, res) => {
  const author = req.query.author;
  let query = "SELECT * FROM books";
  let params = [];

  if (author) {
      query += " WHERE author = ?";
      params.push(author);
  }

  db.query(query, params, (err, result) => {
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
