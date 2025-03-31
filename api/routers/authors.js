const express = require("express");
const router = express.Router();
const db = require("../db"); // ✅ MySQL connection import

// CREATE a new author
router.post("/", (req, res) => {
  const { name, bio } = req.body;
  const query = "INSERT INTO authors (name, bio) VALUES (?, ?)";

  db.query(query, [name, bio], (err, result) => {
    if (err) {
      console.log("Error inserting data:", err);
      return res.status(500).json({ error: "Failed to insert author" });
    }
    res.status(201).json({
      message: "Author added successfully",
      authorId: result.insertId,
    });
  });
});

// READ all authors
router.get("/", (req, res) => {
  const query = "SELECT * FROM authors";  

  db.query(query, (err, result) => {
    if (err) {
      console.log("Error fetching authors:", err);
      return res.status(500).json({ error: "Failed to fetch authors" });
    }
    res.status(200).json(result);
  });
});

// READ a single author by ID
router.get("/:id", (req, res) => {
  const authorId = req.params.id;
  const query = "SELECT * FROM authors WHERE id = ?";

  db.query(query, [authorId], (err, result) => {
    if (err) {
      console.log("Error fetching author:", err);
      return res.status(500).json({ error: "Failed to fetch author" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.status(200).json(result[0]);
  });
});

// UPDATE an author by ID
router.put("/:id", (req, res) => {
  const authorId = req.params.id;
  const { name, bio } = req.body;
  const query = "UPDATE authors SET name = ?, bio = ? WHERE id = ?";

  db.query(query, [name, bio, authorId], (err, result) => {
    if (err) {
      console.log("Error updating author:", err);
      return res.status(500).json({ error: "Failed to update author" });
    }
    res.status(200).json({ message: "Author updated successfully" });
  });
});

// DELETE an author by ID
router.delete("/:id", (req, res) => {
  const authorId = req.params.id;
  const query = "DELETE FROM authors WHERE id = ?";

  db.query(query, [authorId], (err, result) => {
    if (err) {
      console.log("Error deleting author:", err);
      return res.status(500).json({ error: "Failed to delete author" });
    }
    res.status(200).json({ message: "Author deleted successfully" });
  });
});

module.exports = router;
