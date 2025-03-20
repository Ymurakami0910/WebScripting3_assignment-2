const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE a new book
router.post('/', (req, res) => {
  const { title, author_id, description, image_name, category_id } = req.body;
  const query = 'INSERT INTO books (title, author_id, description, image_name, category_id) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [title, author_id, description, image_name, category_id], (err, result) => {
    if (err) {
      console.log("Error inserting data: ", err);
      return res.status(500).json({ error: 'Failed to insert book' });
    }
    res.status(201).json({ message: 'Book added successfully', bookId: result.insertId });
  });
});

// READ all books
router.get('/', (req, res) => {
  const query = 'SELECT * FROM books';

  db.query(query, (err, result) => {
    if (err) {
      console.log("Error fetching books: ", err);
      return res.status(500).json({ error: 'Failed to fetch books' });
    }
    res.status(200).json(result);
  });
});

// READ a single book by ID
router.get('/:id', (req, res) => {
  const bookId = req.params.id;
  const query = 'SELECT * FROM books WHERE id = ?';

  db.query(query, [bookId], (err, result) => {
    if (err) {
      console.log("Error fetching book: ", err);
      return res.status(500).json({ error: 'Failed to fetch book' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(result[0]);
  });
});

// UPDATE a book by ID
router.put('/:id', (req, res) => {
  const bookId = req.params.id;
  const { title, author_id, description, image_name, category_id } = req.body;
  const query = 'UPDATE books SET title = ?, author_id = ?, description = ?, image_name = ?, category_id = ? WHERE id = ?';

  db.query(query, [title, author_id, description, image_name, category_id, bookId], (err, result) => {
    if (err) {
      console.log("Error updating book: ", err);
      return res.status(500).json({ error: 'Failed to update book' });
    }
    res.status(200).json({ message: 'Book updated successfully' });
  });
});

// DELETE a book by ID
router.delete('/:id', (req, res) => {
  const bookId = req.params.id;
  const query = 'DELETE FROM books WHERE id = ?';

  db.query(query, [bookId], (err, result) => {
    if (err) {
      console.log("Error deleting book: ", err);
      return res.status(500).json({ error: 'Failed to delete book' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  });
});

module.exports = router;
