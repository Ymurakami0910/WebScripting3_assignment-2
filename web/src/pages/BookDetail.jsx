import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import g from '../global.module.css';

function BookDetail() {
  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/books/${id}`);
        const data = await res.json();
        if (res.ok) {
          setBook(data);
          setNewTitle(data.title);
          setNewAuthor(data.author_id);
          setNewDescription(data.description);

          const authorRes = await fetch(`http://localhost:3000/api/authors/${data.author_id}`);
          const authorData = await authorRes.json();
          if (authorRes.ok) {
            setAuthor(authorData);
          }
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    const fetchAuthors = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/authors");
        const data = await res.json();
        if (res.ok) {
          setAuthors(data);
        }
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchBook();
    fetchAuthors();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBook = {
      title: newTitle,
      author_id: newAuthor,
      description: newDescription,
    };

    fetch(`http://localhost:3000/api/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Book updated successfully!");
        navigate(`/books/${id}`);
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });
  };

    // Function to delete a book
    const deleteBook = async () => {
      const confirmed = window.confirm("Are you sure you want to delete this book?");
      if (!confirmed) return;
    
      try {
        const res = await fetch(`http://localhost:3000/api/books/${id}`, {
          method: "DELETE",
        });
    
        if (!res.ok) throw new Error("Failed to delete book");
    
        alert("Book deleted!");
        navigate("/books"); // redirect to book list or homepage
      } catch (err) {
        console.error(err);
        alert("Error deleting book");
      }
    };
    
// ここ
  if (!book || !author) return <div>Loading...</div>;

  return (
    <div className={g['container']}>
      <h1>Edit Book Details</h1>
      <div>
        <h2>{book.title}</h2>
        <img className={g['card-img']} src={`http://localhost:3000/images/${book.image_name}`} alt={book.title} />
        <p><strong>Description:</strong> {book.description}</p>
        <p><strong>Author:</strong> {author.name}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <select id="author" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)}>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
        </div>

        <button
                  className={g["delete-btn"]}
                  onClick={() => deleteBook(book.id)}
                >
                  X Delete
                </button>
        <button className={g["button"]} type="submit">Update Book</button>
      </form>
    </div>
  );
}

export default BookDetail;
