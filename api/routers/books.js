const express = require("express");
const db = require("../db"); // ✅ MySQL connection import

const router = express.Router();

// CREATE a new book (with image upload) -- If needed
// router.post("/", ...); (Include if you're implementing book creation logic)

// READ all books or filter by author/genre
router.get("/", (req, res) => {
  const author = req.query.author;
  const genre = req.query.genre;  // Ensure genre is handled
  
  let query = "SELECT * FROM books";
  let params = [];

  if (author) {
    query += " WHERE author LIKE ?";
    params.push('%' + author + '%');
  }

  if (genre) {
    if (params.length > 0) {
      query += " AND genre LIKE ?";
    } else {
      query += " WHERE genre LIKE ?";
    }
    params.push('%' + genre + '%');
  }

  db.query(query, params, (err, result) => {
    if (err) {
      console.log("Error fetching books:", err);
      return res.status(500).json({ error: "Failed to fetch books" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "No books found" });
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
  const { title, author, description } = req.body;  // Data from front-end
  const bookId = req.params.id;

  const query = `
    UPDATE books
    SET title = ?, author = ?, description = ?
    WHERE id = ?;
  `;
  db.query(query, [title, author, description, bookId], (err, result) => {
    if (err) {
      console.error("Error updating book:", err);
      return res.status(500).json({ error: "Failed to update book" });
    }
    res.json({ message: "Book updated successfully" });
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
