import { useState, useEffect } from "react";
import m from "./AddBookModalContent.module.css";
import g from "../global.module.css";

function AddBookModal({ onClose }) {
    // State hooks for book categories, authors, and form inputs
    const [dbCategories, setDbCategories] = useState([]); // Store categories
    const [dbAuthors, setDbAuthors] = useState([]); // Store authors
    const [categoryChips, setCategoryChips] = useState([]); // Store selected category chips
    const [authorChips, setAuthorChips] = useState([]); // Store selected author chips
    const [title, setTitle] = useState(""); // Store the title of the book
    const [description, setDescription] = useState(""); // Store the description
    const [image, setImage] = useState(null); // Store the image file

    // Fetch categories and authors when the component mounts
    useEffect(() => {
        fetch("http://localhost:3000/categories")  // Corrected URL for categories
            .then((response) => response.json())
            .then((responseJSON) => setDbCategories(responseJSON))
            .catch((error) => console.error("Error fetching categories:", error));

        fetch("http://localhost:3000/authors")  // Fetch authors for the author chips
            .then((response) => response.json())
            .then((responseJSON) => setDbAuthors(responseJSON))
            .catch((error) => console.error("Error fetching authors:", error));
    }, []);

    // Handle adding a chip to the selected categories/authors
    const handleChipAdd = (value, type) => {
        if (type === "category" && !categoryChips.includes(value)) {
            setCategoryChips([...categoryChips, value]);
        }
        if (type === "author" && !authorChips.includes(value)) {
            setAuthorChips([...authorChips, value]);
        }
    };

    // Handle removing a chip from the selected categories/authors
    const handleChipRemove = (value, type) => {
        if (type === "category") {
            setCategoryChips(categoryChips.filter((chip) => chip !== value));
        }
        if (type === "author") {
            setAuthorChips(authorChips.filter((chip) => chip !== value));
        }
    };

    // Handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("author_id", authorChips.join(","));
        formData.append("description", description);
        formData.append("category_id", categoryChips.join(","));
        formData.append("image", image);

        try {
            const response = await fetch("http://localhost:3000/books", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();

            // Close modal on success
            if (result.success) {
                onClose();
            } else {
                alert("Failed to add book.");
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
                        <label htmlFor="category">Category</label>
                        <div className={g["chip-container"]}>
                            {/* Render available categories as chips */}
                            {dbCategories.length > 0 && dbCategories.map((cat) => (
                                <span
                                    key={cat.id}
                                    className={g["chip"]}
                                    onClick={() => handleChipAdd(cat.id, "category")}
                                >
                                    {cat.name}
                                </span>
                            ))}
                        </div>
                        <div className={g["selected-chips"]}>
                            {/* Display selected category chips */}
                            {categoryChips.map((chip) => (
                                <span
                                    key={chip}
                                    className={g["selected-chip"]}
                                    onClick={() => handleChipRemove(chip, "category")}
                                >
                                    {chip} <span className="remove-chip">x</span>
                                </span>
                            ))}
                        </div>
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
                        <label htmlFor="authorId">Author</label>
                        <div className={g["chip-container"]}>
                            {/* Render available authors as chips */}
                            {dbAuthors.length > 0 && dbAuthors.map((author) => (
                                <span
                                    key={author.id}
                                    className={g["chip"]}
                                    onClick={() => handleChipAdd(author.id, "author")}
                                >
                                    {author.name}
                                </span>
                            ))}
                        </div>
                        <div className={g["selected-chips"]}>
                            {/* Display selected author chips */}
                            {authorChips.map((chip) => (
                                <span
                                    key={chip}
                                    className={g["selected-chip"]}
                                    onClick={() => handleChipRemove(chip, "author")}
                                >
                                    {chip} <span className="remove-chip">x</span>
                                </span>
                            ))}
                        </div>
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
