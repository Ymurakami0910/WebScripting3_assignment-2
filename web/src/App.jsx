// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllBooks from './pages/AllBooks'; // Assuming your AllBooks component is in the pages folder
import BookDetail from './pages/BookDetail'; // Import the BookDetail component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllBooks />} />
        <Route path="/books/:id" element={<BookDetail />} /> {/* Add this route for book details */}
      </Routes>
    </Router>
  );
}

export default App;
