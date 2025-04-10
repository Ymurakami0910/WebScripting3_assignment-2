import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AllBooks from "./pages/AllBooks"; 
import BookDetail from "./pages/BookDetail"; 
import authRequired from "./authReq";  // Import the authRequired function
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Log out function
  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    setIsAuthenticated(false);
    navigate("/sign-in");
  };

  // Log in function
  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/");
  };

  // Check if the user has a token when the page loads
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt-token");
    if (jwtToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={authRequired(AllBooks)} />
      <Route path="/books/:id" element={authRequired(BookDetail)} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn handleLogin={handleLogin} />} />
    </Routes>
  );
}

export default App;
