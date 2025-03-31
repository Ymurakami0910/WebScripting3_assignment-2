import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";  // useNavigate for redirecting after the update
import g from '../global.module.css';  // Import global styles (which includes the card styles)

function BookDetail() {
  const [book, setBook] = useState(null);  // State to store the book details
  const [author, setAuthor] = useState(null);  // State to store the author details
  const [newTitle, setNewTitle] = useState("");  // State to store the new title input
  const [newAuthor, setNewAuthor] = useState("");  // State to store the new author input
  const [newDescription, setNewDescription] = useState("");  // State to store the new description input
  const { id } = useParams();  // Extract the book ID from the URL
  const navigate = useNavigate();  // Hook to navigate after update

  // Fetch the book details from the server using the book ID
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/books/${id}`);
        const data = await res.json();
        if (res.ok) {
          setBook(data);  // Set the book details to state
          setNewTitle(data.title);  // Set initial value for title input
          setNewAuthor(data.author);  // Set initial value for author input
          setNewDescription(data.description);  // Set initial value for description input

          // Fetch the author details once the book data is available
          const authorRes = await fetch(`http://localhost:3000/api/authors/${data.author_id}`);
          const authorData = await authorRes.json();
          if (authorRes.ok) {
            setAuthor(authorData);  // Set the author details to state
          } else {
            console.error("Error fetching author details:", authorData.error);
          }
        } else {
          console.error("Error fetching book details:", data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error); // Handle errors
      }
    };
    fetchBook();
  }, [id]);

  // Handle form submission to update the book
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedBook = {
      title: newTitle,
      author: newAuthor,
      description: newDescription,  // Include description in the update
    };
  
    fetch(`http://localhost:3000/api/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message); // Log success message
  
        // Show an alert upon successful update
        alert("Book updated successfully!");
  
        // Redirect to the updated book detail page
        navigate(`/books/${id}`);
      })
      .catch((error) => {
        console.error("Error updating book:", error); // Handle errors
      });
  };
  

  // Display loading message if the book or author is still being fetched
  if (!book || !author) {
    return <div>Loading...</div>;
  }

  return (
    <div className={g['container']}>
      <h1>Edit Book Details</h1>
      
      {/* Book Info */}
      <div>
        <h2>{book.title}</h2>
        <img 
          className={g['card-img']}  // Use g for styles
          src={`http://localhost:3000/images/${book.image_name}`} 
          alt={book.title} 
        />
        <p><strong>Description:</strong> {book.description}</p>
        <p><strong>Author(s):</strong> {author.name}</p> {/* Display author name */}
      </div>
      
      {/* Form to Edit Book */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={newTitle}  // Default value is set to the current title
            onChange={(e) => setNewTitle(e.target.value)}  // Update state on change
          />
        </div>
        <div>
          {/* <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={newAuthor}  // Default value is set to the current author
            onChange={(e) => setNewAuthor(e.target.value)}  // Update state on change
          /> */}
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={newDescription}  // Default value is set to the current description
            onChange={(e) => setNewDescription(e.target.value)}  // Update state on change
          />
        </div>
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}

export default BookDetail;
