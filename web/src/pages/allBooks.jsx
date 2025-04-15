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

    const token = localStorage.getItem('jwt-token')
      
    // In fetchBooks function
    if (selectedAuthor) {
      params.append("author_id", selectedAuthor); // Consistent parameter name
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    console.log("Fetching books from URL:", url);

    fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authentication
        },
      })
      .then((res) => res.json())
      .then((jsonData) => {
        console.log(jsonData);



        // Ensure the data is an array
        if (Array.isArray(jsonData)) {
          setBooks(jsonData);
          setFilteredBooks(jsonData);
        } else {
          console.error("Fetched data is not an array:", jsonData);
        }
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
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
        {/* Check if filteredBooks is an array before using map */}
        {Array.isArray(filteredBooks) && filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Link key={book.id} to={`/books/${book.id}`}>
              <li className={at.card}>
                <div className={at["card-header"]}>
                  <h2>{book.title}</h2>
                </div>
                <img
                  className={at["card-img"]}
                  src={`http://localhost:3000/images/${book.image_name}`}
                  alt={book.title}
                />
              </li>
            </Link>
          ))
        ) : (
          <p>No books available</p> // Display a message if no books are available
        )}
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
