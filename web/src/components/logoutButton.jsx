import { useNavigate } from "react-router-dom";
import g from "../global.module.css"; // ← これが必要！

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt-token"); 
    alert("Logged out successfully!");
    navigate("/sign-in"); 
  };

return (
    <button className={`${g["button"]}`}
    onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
