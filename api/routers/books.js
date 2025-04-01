const express = require("express");
const db = require("../db"); // ✅ MySQL connection import
const router = express.Router();
const multer = require("multer")

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // Files are stored in the 'public/images' directory
  },
  filename: (req, file, cb) => {
    // Use the current timestamp and the original file extension to create a unique filename
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// CREATE a new book (with image upload) -- If needed
// router.post("/", ...); (Include if you're implementing book creation logic)

router.get("/", (req, res) => {
  const authorId = req.query.author_id; // Use "author_id" instead of "author"
  const genre = req.query.genre;

  let query = "SELECT * FROM books";
  let params = [];

  if (authorId) {
    query += " WHERE author_id = ?"; // Change to author_id (assuming this is the correct column in the database)
    params.push(authorId);
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

router.put("/:id", (req, res) => {
  const { title, description, author_id } = req.body;  // Data from front-end
  const bookId = req.params.id;

  const query = `
    UPDATE books
    SET title = ?, description = ?, author_id = ?
    WHERE id = ?;
  `;
  db.query(query, [title, description, author_id, bookId], (err, result) => {
    if (err) {
      console.error("Error updating book:", err);
      return res.status(500).json({ error: "Failed to update book" });
    }
    res.json({ message: "Book updated successfully" });
  });
});

// Add to books router
const path = require('path');

router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log( req.body);
    console.log("Uploaded file:", req.file);

    const { title, author, description } = req.body;
    
    if (!title || !author) {
      return res.status(400).json({ error: "Title and author are required" });
    }

    const imagePath = req.file 
      ? req.file.filename
      : null;

    const query = `
      INSERT INTO books (title, author_id, description, image_name)
      VALUES (?, ?, ?, ?)
    `;
    
    db.query(query, [title, author, description, imagePath], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        // if (req.file) fs.unlinkSync(req.file.path); // Clean up uploaded file
        return res.status(500).json({ error: "Database operation failed" });
      }
      
      console.log("Inserted book with ID:", result.insertId);
      res.status(201).json({ 
        message: "Book created successfully",
        bookId: result.insertId 
      });
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
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
