import { useState, useEffect } from "react";
import m from "./AddBookModalContent.module.css";
import g from "../global.module.css";

function AddBookModal({ onClose }) {
  // State hooks for authors and form inputs
  const [dbAuthors, setDbAuthors] = useState([]); // Store authors
  const [authorChips, setAuthorChips] = useState([]); // Store selected author IDs
  const [newAuthor, setNewAuthor] = useState(""); // For manual author input
  const [title, setTitle] = useState(""); // Store the title of the book
  const [description, setDescription] = useState(""); // Store the description
  const [image, setImage] = useState(null); // Store the image file

  // Fetch authors when the component mounts
  useEffect(() => {
    fetch("http://localhost:3000/api/authors") // Fetch authors for the author chips
      .then((response) => response.json())
      .then((responseJSON) => setDbAuthors(responseJSON))
      .catch((error) => console.error("Error fetching authors:", error));
  }, []);

  // Handle adding a chip to the selected authors
  const handleSelectChange = (event) => {
    const selectedAuthors = Array.from(event.target.selectedOptions, (option) => option.value);
    setAuthorChips(selectedAuthors);
  };

  // Handle manual author input
  const handleAuthorInputChange = (e) => {
    setNewAuthor(e.target.value);
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);

    // If newAuthor is provided, add it to the authorChips array
    const authors = newAuthor ? [...authorChips, newAuthor] : authorChips;
    formData.append("author", authors.join(","));  // Send the authors as a comma-separated string
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:3000/api/books", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        // Close the modal on success
        onClose();
      } else {
        alert(result.message || "Failed to add book.");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert("An error occurred while adding the book.");
    }
  };

  return (
    <div className={m["modal-container"]}>
      <div className={`${m["modal"]} ${g["card"]}`}>
        <h3>Add a new book</h3>
        <form
          onSubmit={handleFormSubmit}
          className={`${g["form-group"]} ${g["grid-container"]}`}
          encType="multipart/form-data"
        >
          <div className={g["col-6"]}>
            <label htmlFor="authorId">Author</label>
            <select
              id="authorId"
              name="authorId"
              multiple
              value={authorChips}
              onChange={handleSelectChange}
              className={g["select"]}
            >
              {/* Render available authors as options */}
              {dbAuthors.length > 0 &&
                dbAuthors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
            </select>
            {/* Manual author input */}
            <label htmlFor="newAuthor">Or add a new author:</label>
            <input
              type="text"
              id="newAuthor"
              name="newAuthor"
              value={newAuthor}
              onChange={handleAuthorInputChange}
              placeholder="Enter new author"
            />
          </div>
          <div className={g["col-6"]}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>
          <div className={g["col-6"]}>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </div>
          <div className={g["col-6"]}>
            <label htmlFor="image">Book Cover Image</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <div className={g["col-12"]}>
            <button className={g["button"]} type="submit">
              Add Book
            </button>
          </div>
        </form>
        <button onClick={onClose} className={m["modal__close-button"]}>
          x
        </button>
      </div>
    </div>
  );
}

export default AddBookModal;
