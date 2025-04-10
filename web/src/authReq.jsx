import { Navigate } from "react-router";

// The higher-order component (HOC) to protect routes
const authRequired = (Component) => {
  // Create/Store the component that will handle authentication
  const AuthenticatedComponent = (props) => {
    const token = localStorage.getItem("jwt-token");

    // If there is no token, redirect to the sign-up page
    if (!token) {
      return <Navigate to="/sign-up" />;
    }

    // If the user is authenticated, render the passed-in component
    return <Component {...props} />;
  };

  return AuthenticatedComponent; // Return the component itself
};

export default authRequired;
