import { useState, useEffect } from "react";
import styles from "./FilterBooks.module.css"; // Import CSS module

function FilterBooks({ setSelectedAuthor, setSelectedGenre }) {
  const [authors, setAuthors] = useState([]); // State to store author list
  const [genres, setGenres] = useState([]); // State to store genre list

  // Fetch author list from the API
  useEffect(() => {
    fetch("http://localhost:3000/api/authors")
      .then((res) => res.json())
      .then((data) => setAuthors(data))
      .catch((err) => console.error("Error fetching authors:", err));
  }, []);

  // Fetch genre list from the API (you need to add an endpoint for genres if it's not available yet)
  useEffect(() => {
    fetch("http://localhost:3000/api/genres") // Assuming you have a genres endpoint
      .then((res) => res.json())
      .then((data) => setGenres(data))
      .catch((err) => console.error("Error fetching genres:", err));
  }, []);

  return (
    <>
      <div className={styles.filterContainer}>
        <label htmlFor="author-filter" className={styles.label}>
          Filter by author:
        </label>
        <select
          id="author-filter"
          onChange={(e) => {
            console.log("Author selection changed:", e.target.value); // Debug log
            setSelectedAuthor(e.target.value);
          }}
        >
          <option value="">All Authors</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name} (ID: {author.id}) {/* Show IDs for debugging */}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default FilterBooks;
