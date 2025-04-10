import { Navigate } from "react-router-dom";

const authRequired = (Component) => {
  const AuthenticatedComponent = (props) => {
    const token = localStorage.getItem("jwt-token");
    
    if (!token) {
      return <Navigate to="/sign-in" replace />;
    }
    
    return <Component {...props} />;
  };
  
  // Return the component, not just the function
  return AuthenticatedComponent;
};

export default authRequired;