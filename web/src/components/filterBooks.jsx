import { useState, useEffect } from "react";
import styles from "./FilterBooks.module.css"; // Import CSS module

function FilterBooks({ setSelectedAuthor }) { // Destructure setSelectedAuthor prop
    const [authors, setAuthors] = useState([]); // State to store author list

    // Fetch author list from the API
    useEffect(() => {
        fetch("http://localhost:3000/api/authors")
            .then(res => res.json())
            .then(data => setAuthors(data))
            .catch(err => console.error("Error fetching authors:", err));
    }, []);

    return (
        <div className={styles.filterContainer}>
            <label htmlFor="author-filter" className={styles.label}>Filter by Author:</label>
            <select 
                id="author-filter"
                className={styles.select}
                onChange={(e) => setSelectedAuthor(e.target.value)} // Call setSelectedAuthor here
            >
                <option value="">All Authors</option>
                {authors.map(author => (
                    <option key={author.id} value={author.name}>{author.name}</option>
                ))}
            </select>
        </div>
    );
}

export default FilterBooks;
