const express = require("express");
const db = require("../db");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authenticateToken = require("../auth.jwt");

// Multer config for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// 🔐 Protect all routes
router.use(authenticateToken);

// ✅ GET all books for the logged-in user, with optional filters
router.get("/", (req, res) => {
  const { author_id, genre } = req.query;
  const user_id = req.user.userId;

  let sql = `
    SELECT books.*, authors.name AS author, authors.id AS author_id
    FROM books
    JOIN authors ON books.author_id = authors.id
    WHERE books.user_id = ?
  `;
  let params = [user_id];

  if (author_id) {
    sql += " AND books.author_id = ?";
    params.push(author_id);
  }

  if (genre) {
    sql += " AND books.genre LIKE ?";
    params.push(`%${genre}%`);
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      console.log("Error fetching books:", err);
      return res.status(500).json({ error: "Failed to fetch books" });
    }
    res.status(200).json(result);
  });
});

// ✅ GET a single book (no user_id filter here, optional)
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

// ✅ POST a new book (with image & user_id)
router.post("/", upload.single("image"), (req, res) => {
  const { title, author_id, description, genre } = req.body;
  const user_id = req.user.userId;

  if (!title || !author_id) {
    return res.status(400).json({ error: "Title and author are required" });
  }

  const image_name = req.file ? req.file.filename : null;

  const query = `
    INSERT INTO books (title, author_id, description, genre, image_name, user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [title, author_id, description, genre, image_name, user_id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Failed to insert book" });
      }
      res.status(201).json({
        message: "Book created successfully",
        bookId: result.insertId
      });
    }
  );
});

// ✅ PUT update a book (include user_id if needed to prevent updating other users’ books)
router.put("/:id", (req, res) => {
  const { title, description, author_id, genre } = req.body;
  const bookId = req.params.id;
  const user_id = req.user.userId;

  const query = `
    UPDATE books
    SET title = ?, description = ?, author_id = ?, genre = ?
    WHERE id = ? AND user_id = ?
  `;

  db.query(
    query,
    [title, description, author_id, genre, bookId, user_id],
    (err, result) => {
      if (err) {
        console.error("Error updating book:", err);
        return res.status(500).json({ error: "Failed to update book" });
      }
      res.json({ message: "Book updated successfully" });
    }
  );
});

// ✅ DELETE a book (only your own book)
router.delete("/:id", (req, res) => {
  const bookId = req.params.id;
  const user_id = req.user.userId;

  const query = "DELETE FROM books WHERE id = ? AND user_id = ?";
  db.query(query, [bookId, user_id], (err, result) => {
    if (err) {
      console.log("Error deleting book:", err);
      return res.status(500).json({ error: "Failed to delete book" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  });
});

module.exports = router;
