import { useNavigate } from "react-router-dom";
import g from "../global.module.css"; 

function LogoutButton() {
  const navigate = useNavigate();

  // remove the jwt-token from local storage
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
