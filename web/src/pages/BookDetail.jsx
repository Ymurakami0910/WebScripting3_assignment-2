import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  // To get the book ID from the URL

import g from '../global.module.css';  // Import global styles (which includes the card styles)

function BookDetail() {
  const [book, setBook] = useState(null);  // State to store the book details
  const [author, setAuthor] = useState(null);  // State to store the author details
  const { id } = useParams();  // Extract the book ID from the URL

  // Fetch the book details from the server using the book ID
  useEffect(() => {
    fetch(`http://localhost:3000/api/books/${id}`)
      .then(res => res.json())
      .then((data) => {
        setBook(data);  // Set the book details to state

        // Fetch the author details once the book data is available
        fetch(`http://localhost:3000/api/authors/${data.author_id}`)
          .then(res => res.json())
          .then((authorData) => {
            setAuthor(authorData);  // Set the author details to state
          })
          .catch((error) => {
            console.error("Error fetching author details:", error); // Handle errors
          });
      })
      .catch((error) => {
        console.error("Error fetching book details:", error); // Handle errors
      });
  }, [id]);

  // Display loading message if the book or author is still being fetched
  if (!book || !author) {
    return <div>Loading...</div>;
  }

  return (
    <div className={g['container']}>
      <h1>{book.title}</h1>
      <img 
        className={g['card-img']}  // Use g for styles
        src={`http://localhost:3000/images/${book.image_name}`} 
        alt={book.title} 
      />
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Author(s):</strong> {author.name}</p> {/* Display author name */}
    </div>
  );
}

export default BookDetail;
