const express = require("express");
const multer = require("./storage"); // Import your multer storage configuration
const path = require("path");

const router = express.Router();
const books = []; // Temporary data store

// Create a new book
router.post("/books", (req, res) => {
  try {
    // Assuming the logic to insert a book (including the image) here
    // Example of inserting into books array
    const { title, author, image } = req.body;
    const newBook = {
      id: books.length + 1, // Simple auto-increment ID
      title,
      author,
      image,
    };
    books.push(newBook); // Add the new book to the array
    res.status(200).send({ message: "Book inserted successfully", book: newBook });
  } catch (error) {
    console.error("Error inserting book:", error);
    res.status(500).send({ error: "Failed to insert book", message: error.message });
  }
});

// Get all books
router.get("/books", (req, res) => {
  res.json(books);
});

// Get a single book by ID
router.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id == req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});


// DELETE a book by ID
router.delete("/books/:id", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id == req.params.id);
  if (bookIndex === -1) {
      return res.status(404).json({ error: "Book not found" });
  }

  const deletedBook = books.splice(bookIndex, 1); // Remove the book from the array
  res.status(200).json({
      message: "Book deleted successfully",
      deletedBook: deletedBook[0], // Return the deleted book
  });
});


module.exports = router;

