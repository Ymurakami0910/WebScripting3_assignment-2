import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import FilterBooks from "../components/filterBooks"; // Corrected typo
import at from "../pages/allBooks.module.css";
import g from "../global.module.css";
import AddBook from "../components/addBookModal";

function AllBooks() {
  const [books, setBooks] = useState([]); // State to store all books
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books
  const [showForm, setShowForm] = useState(false); // State to toggle modal visibility
  const [selectedAuthor, setSelectedAuthor] = useState(""); // State for selected author
  const [selectedGenre, setSelectedGenre] = useState(""); // State for selected genre

  // Function to fetch books from the backend
  const fetchBooks = () => {
    let url = "http://localhost:3000/api/books";
    const params = new URLSearchParams();
      
    // In fetchBooks function
    if (selectedAuthor) {
      params.append("author_id", selectedAuthor); // Consisstant parameter name
    }

    if (selectedGenre) {
      params.append("genre", selectedGenre);
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    console.log("Fetching books from URL:", url);

    fetch(url)
      .then((res) => res.json())
      .then((jsonData) => {
        console.log(jsonData);
        setBooks(jsonData);
        setFilteredBooks(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  };

  // Function to delete a book
  const deleteBook = (id) => {
    fetch(`http://localhost:3000/api/books/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message); // Log success message
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id)); // Remove book from state
        setFilteredBooks((prevBooks) =>
          prevBooks.filter((book) => book.id !== id)
        ); // Remove book from filteredBooks state
      })
      .catch((error) => {
        console.error("Error deleting book:", error); // Handle errors
      });
  };

  useEffect(() => {
    fetchBooks(); // Fetch books whenever selectedAuthor or selectedGenre changes
  }, [selectedAuthor, selectedGenre]);

  return (
    <div className={g.container}>
      <h1>All Books</h1>

      {/* Pass setSelectedAuthor and setSelectedGenre to FilterBooks */}
      <FilterBooks
        setSelectedAuthor={setSelectedAuthor}
        setSelectedGenre={setSelectedGenre}
      />

      <ul className={at.cards}>
        {filteredBooks.map((book) => (
          <Link key={book.id} to={`/books/${book.id}`}>
            <li className={at.card}>
              <div className={at["card-header"]}>
                <h2>{book.title}</h2>
                <button
                  className={at["delete-btn"]}
                  onClick={() => deleteBook(book.id)}
                >
                  X Delete
                </button>
              </div>
              <img
                className={at["card-img"]}
                src={`http://localhost:3000/images/${book.image_name}`}
                alt={book.title}
              />
            </li>
          </Link>
        ))}
      </ul>

      {/* Button to toggle AddBook modal */}
      <button className={g["button"]} onClick={() => setShowForm(true)}>Add New Book</button>

      {/* Modal for adding a new book */}
      {showForm && (
        <div className={at.modal}>
          <div className={at["modal-content"]}>
            <button className={at.close} onClick={() => setShowForm(false)}>
              ×
            </button>
            <AddBook onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AllBooks;
