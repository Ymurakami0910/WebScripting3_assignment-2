const express = require("express");
const cors = require("cors");
const db = require("./db"); // ✅ MySQL connection import
const fs = require("fs");
const upload = require("./storage"); // ✅ Multer import

// Import Routers
const bookRoutes = require("./routers/books");
const authorRoutes = require("./routers/authors");

const app = express();
const PORT = 3000;

// Enable CORS and Body Parsers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve images from the 'public/images' directory
app.use("/images", express.static("public/images"));

// Use Routes for books and authors
app.use("/api/books", bookRoutes);  // Prefixing the routes with '/api/books'
app.use("/api/authors", authorRoutes);  // Prefixing the routes with '/api/authors'

// Default route to ensure server is running
app.get("/", (req, res) => {
  res.send("Welcome to the Book & Author API!");
});

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
