const express = require("express");
const cors = require("cors");
const db = require("./db"); // ✅ MySQL connection import
const fs = require("fs");
const multer = require("multer"); // ✅ Multer import
const path = require("path"); // For handling file extensions

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

// Use Routes for books and authors
app.use("/api/books", bookRoutes);  // Prefixing the routes with '/api/books'
app.use("/api/authors", authorRoutes);  // Prefixing the routes with '/api/authors'



// Route to handle form submission
app.post("/api/books", upload.single("image"), (req, res) => {
  try {
    // Log the file and form data to verify they are received correctly
    console.log("Uploaded file:", req.file);  // Check the uploaded file
    const { title, description, author } = req.body;

    // You can now process this data, e.g., store in a database

    res.status(200).json({ message: "Book added successfully!" });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Error adding book" });
  }
});

// Default route to ensure server is running
app.get("/", (req, res) => {
  res.send("Welcome to the Book & Author API!");
});

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
