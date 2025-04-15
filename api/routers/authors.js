const express = require("express");
const router = express.Router();
const db = require("../db"); // ✅ MySQL connection import

// CREATE a new author
router.post("/", (req, res) => {
  const { name, bio } = req.body; // Extract name and bio from the request body
  const query = "INSERT INTO authors (name, bio) VALUES (?, ?)"; // SQL query to insert a new author

  // Execute the query to insert the data into the database
  db.query(query, [name, bio], (err, result) => {
    if (err) {
      console.log("Error inserting data:", err); // Log any error if the query fails
      return res.status(500).json({ error: "Failed to insert author" }); // Send error response
    }
    // If successful, send back a response with the inserted author ID
    res.status(201).json({
      message: "Author added successfully",
      authorId: result.insertId, // Return the ID of the newly added author
    });
  });
});

// READ all authors
router.get("/", (req, res) => {
  const query = "SELECT * FROM authors"; // SQL query to fetch all authors

  // Execute the query to retrieve authors from the database
  db.query(query, (err, result) => {
    if (err) {
      console.log("Error fetching authors:", err); // Log any error if the query fails
      return res.status(500).json({ error: "Failed to fetch authors" }); // Send error response
    }
    // If successful, send the list of authors as the response
    res.status(200).json(result); // Return all authors
  });
});

// READ a single author by ID
router.get("/:id", (req, res) => {
  const authorId = req.params.id; // Get the author ID from the URL parameter
  const query = "SELECT * FROM authors WHERE id = ?"; // SQL query to fetch the author by ID

  // Execute the query to retrieve the author with the given ID
  db.query(query, [authorId], (err, result) => {
    if (err) {
      console.log("Error fetching author:", err); // Log any error if the query fails
      return res.status(500).json({ error: "Failed to fetch author" }); // Send error response
    }
    if (result.length === 0) { 
      // If no author is found, send a 404 response indicating that the author doesn't exist
      return res.status(404).json({ error: "Author not found" });
    }
    // If successful, send the author's details as the response
    res.status(200).json(result[0]); // Return the first result (should only be one)
  });
});

// UPDATE an author by ID
router.put("/:id", (req, res) => {
  const authorId = req.params.id; // Get the author ID from the URL parameter
  const { name, bio } = req.body; // Extract name and bio from the request body
  const query = "UPDATE authors SET name = ?, bio = ? WHERE id = ?"; // SQL query to update an author by ID

  // Execute the query to update the author details
  db.query(query, [name, bio, authorId], (err, result) => {
    if (err) {
      console.log("Error updating author:", err); // Log any error if the query fails
      return res.status(500).json({ error: "Failed to update author" }); // Send error response
    }
    // If successful, send a success message as the response
    res.status(200).json({ message: "Author updated successfully" });
  });
});

// DELETE an author by ID
router.delete("/:id", (req, res) => {
  const authorId = req.params.id; // Get the author ID from the URL parameter
  const query = "DELETE FROM authors WHERE id = ?"; // SQL query to delete the author by ID

  // Execute the query to delete the author from the database
  db.query(query, [authorId], (err, result) => {
    if (err) {
      console.log("Error deleting author:", err); // Log any error if the query fails
      return res.status(500).json({ error: "Failed to delete author" }); // Send error response
    }
    // If successful, send a success message as the response
    res.status(200).json({ message: "Author deleted successfully" });
  });
});

// Export the router for use in other parts of the application
module.exports = router;
