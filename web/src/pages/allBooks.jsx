import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 

import at from "../pages/allBooks.module.css";
import g from '../global.module.css';

import AddBook from "../components/addBookModal"; // Import AddBook component

function AllBooks() {
    const [books, setBooks] = useState([]); // State for storing books
    const [showForm, setShowForm] = useState(false); // State to toggle form modal

    // Function to fetch books from the backend
    const fetchBooks = () => {
        fetch("http://localhost:3000/books")
            .then(res => res.json())
            .then((jsonData) => {
                console.log(jsonData); // Log fetched data
                setBooks(jsonData); // Set books to state
            })
            .catch((error) => {
                console.error("Error fetching books:", error); // Handle errors
            });
    };

    // Function to delete a book from the backend
    const deleteBook = (id) => {
        fetch(`http://localhost:3000/books/${id}`, {
            method: 'DELETE', // Use DELETE method
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.message); // Log success message from backend
            // Remove the deleted book from the state
            setBooks(books.filter(book => book.id !== id));
        })
        .catch((error) => {
            console.error("Error deleting book:", error); // Handle errors
        });
    };

    // Fetch books on initial load
    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className={g['container']}>
            <h1>All Books</h1>
            <ul className={at['cards']}>
                {books.map((book) => (
                    <li className={at['card']} key={book.id}>
                        <div className={at['card-header']}>
                            <Link to={`/books/${book.id}`}>
                                <h2>{book.title}</h2>
                            </Link>
                            {/* Add the delete icon (X) */}
                            <button 
                                className={at['delete-btn']} 
                                onClick={() => deleteBook(book.id)}
                            >
                                X
                            </button>
                        </div>
                        <img className={at['card-img']} src={`http://localhost:3000/images/${book.image_name}`} alt={book.title} />
                    </li>
                ))}
            </ul>

            {/* Button to toggle AddBook modal */}
            <button onClick={() => setShowForm(true)}>Add New Book</button>

            {showForm && ( // Modal for adding new book
                <div className={at['modal']}>
                    <div className={at['modal-content']}>
                        {/* Close button to hide the modal */}
                        <button className={at['close']} onClick={() => setShowForm(false)}>×</button>
                        {/* Display the AddBook form when showForm is true */}
                        <AddBook onClose={() => setShowForm(false)} />
                    </div>
                </div>
            )}
        </div>      
    );
}

export default AllBooks;
