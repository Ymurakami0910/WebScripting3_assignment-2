import { useState, useEffect } from "react";
import m from "./AddBookModalContent.module.css";
import g from "../global.module.css";


function AddBookModal({ onClose }) {
  // State hooks for authors and form inputs
  const [dbAuthors, setDbAuthors] = useState([]); // Store authors from the database
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
    setAuthorChips(event.target.value);
  };

  // Handle manual author input
  const handleAuthorInputChange = (e) => {
    setNewAuthor(e.target.value);
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Validate required fields
      if (!title) {
        alert("Please enter a title");
        return;
      }
  
      // Use either the first selected author OR the new author input
      const selectedAuthor = authorChips ? authorChips : newAuthor;
  
      if (!selectedAuthor) {
        alert("Please select or enter an author");
        return;
      }
  
      // Basic image validation
      if (image) {
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validTypes.includes(image.type)) {
          alert("Please upload a valid image (JPEG, PNG, GIF)");
          return;
        }
        if (image.size > 2 * 1024 * 1024) {
          // 2MB limit
          alert("Image size should be less than 2MB");
          return;
        }
      }
  
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author_id", selectedAuthor);
      formData.append("description", description);
      if (image) formData.append("image", image);
  
      // Retrieve JWT Token from localStorage or wherever it's stored
      const token = localStorage.getItem("jwt-token");
  
      const response = await fetch("http://localhost:3000/api/books", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authentication
        },
      });
      
      console.log(response)
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to add book:", errorData);
        throw new Error(errorData.message || "Failed to add book");
      }
  
      const result = await response.json();
      alert("Book added successfully!");
      onClose(); // Close modal on success
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "An error occurred while adding the book");
    }
  };
  

  return (
    <div className={m["modal-container"]}>
      <div className={`${m["modal"]} ${g["card"]}`}>
        <h3>Add a new book</h3>
        <form
          onSubmit={handleFormSubmit}
          className={`${g["form-group"]} ${g["grid-container"]}`}
          encType="multipart/form-data" // Ensure enctype is set to handle file uploads
        >
          <div className={g["col-6"]}>
            <label htmlFor="authorId">Author</label>
            <select
              id="authorId"
              name="authorId"
              onChange={handleSelectChange} // Store as array with single value
              className={g["select"]}
            >
              <option value="">Select an author</option>
              {dbAuthors.map((author) => (
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
              onChange={(e) => setImage(e.target.files[0])} // Store the selected image
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
