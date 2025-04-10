import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AllBooks from "./pages/AllBooks"; 
import BookDetail from "./pages/BookDetail"; 
import authRequired from "./authReq";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Create wrapped components
  const AuthenticatedAllBooks = authRequired(AllBooks);
  const AuthenticatedBookDetail = authRequired(BookDetail);

  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    setIsAuthenticated(false);
    navigate("/sign-in");
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/");
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt-token");
    if (jwtToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Routes>
      {/* Use the wrapped components */}
      <Route path="/" element={<AuthenticatedAllBooks />} />
      <Route path="/books/:id" element={<AuthenticatedBookDetail />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn handleLogin={handleLogin} />} />
    </Routes>
  );
}

export default App;