const express = require("express");
const cors = require("cors");
const db = require("./db"); // ✅ Import MySQL connection
const upload = require("./storage"); // ✅ Import file upload middleware

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve images from public directory
app.use("/images", express.static("public/images"));

// ✅ **GET ALL ITEMS**
app.get("/books", (req, res) => {
    const sql = "SELECT * FROM books";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching data:", err);
            res.status(500).json({ error: "Database error" });
            return;
        }
        res.json(result);
    });
});

// ✅ **GET SINGLE ITEM**
app.get("/books/:id", (req, res) => {
    const sql = "SELECT * FROM books WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error("Error fetching item:", err);
            res.status(500).json({ error: "Database error" });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: "Book not found" });
            return;
        }
        res.json(result[0]);
    });
});

// ✅ **FILTER ITEMS BY CATEGORY**
app.get("/books/category/:category", (req, res) => {
    const sql = "SELECT * FROM books WHERE category = ?";
    db.query(sql, [req.params.category], (err, result) => {
        if (err) {
            console.error("Error filtering books:", err);
            res.status(500).json({ error: "Database error" });
            return;
        }
        res.json(result);
    });
});

// ✅ **ADD ITEM**
app.post("/books", upload.single("image"), (req, res) => {
    const { title, author, category } = req.body;
    const image = req.file ? req.file.filename : null;
    const sql = "INSERT INTO books (title, author, category, image) VALUES (?, ?, ?, ?)";

    db.query(sql, [title, author, category, image], (err, result) => {
        if (err) {
            console.error("Error adding book:", err);
            res.status(500).json({ error: "Database error" });
            return;
        }
        res.status(201).json({ id: result.insertId, title, author, category, image });
    });
});

// ✅ **EDIT ITEM**
app.put("/books/:id", upload.single("image"), (req, res) => {
    const { title, author, category } = req.body;
    const image = req.file ? req.file.filename : null;
    let sql = "UPDATE books SET title = ?, author = ?, category = ?" + (image ? ", image = ?" : "") + " WHERE id = ?";
    let values = image ? [title, author, category, image, req.params.id] : [title, author, category, req.params.id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating book:", err);
            res.status(500).json({ error: "Database error" });
            return;
        }
        res.json({ message: "Book updated successfully" });
    });
});

// ✅ **DELETE ITEM**
app.delete("/books/:id", (req, res) => {
    const sql = "DELETE FROM books WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error("Error deleting book:", err);
            res.status(500).json({ error: "Database error" });
            return;
        }
        res.json({ message: "Book deleted successfully" });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
